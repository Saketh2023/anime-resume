#!/usr/bin/env node

/**
 * Accessibility Audit Script
 * Runs automated accessibility checks and provides recommendations
 */

const fs = require('fs');
const path = require('path');

class AccessibilityAuditor {
  constructor() {
    this.issues = [];
    this.recommendations = [];
    this.srcPath = path.join(process.cwd(), 'src');
  }

  // Check for common accessibility issues in React components
  auditComponent(filePath, content) {
    const issues = [];
    const fileName = path.basename(filePath);

    // Check for missing alt attributes on images
    const imgRegex = /<img[^>]*>/g;
    const imgMatches = content.match(imgRegex) || [];
    imgMatches.forEach(img => {
      if (!img.includes('alt=')) {
        issues.push({
          file: fileName,
          line: this.getLineNumber(content, img),
          type: 'missing-alt',
          message: 'Image missing alt attribute',
          element: img,
          severity: 'error'
        });
      }
    });

    // Check for buttons without accessible text
    const buttonRegex = /<button[^>]*>(.*?)<\/button>/gs;
    const buttonMatches = content.match(buttonRegex) || [];
    buttonMatches.forEach(button => {
      const innerText = button.match(/<button[^>]*>(.*?)<\/button>/s)?.[1] || '';
      const hasAriaLabel = button.includes('aria-label');
      const hasAriaLabelledby = button.includes('aria-labelledby');
      
      if (!innerText.trim() && !hasAriaLabel && !hasAriaLabelledby) {
        issues.push({
          file: fileName,
          line: this.getLineNumber(content, button),
          type: 'inaccessible-button',
          message: 'Button without accessible text content',
          element: button,
          severity: 'error'
        });
      }
    });

    // Check for missing heading hierarchy
    const headingRegex = /<h([1-6])[^>]*>/g;
    const headings = [];
    let match;
    while ((match = headingRegex.exec(content)) !== null) {
      headings.push({
        level: parseInt(match[1]),
        line: this.getLineNumber(content, match[0]),
        element: match[0]
      });
    }

    // Validate heading hierarchy
    for (let i = 1; i < headings.length; i++) {
      const current = headings[i];
      const previous = headings[i - 1];
      
      if (current.level > previous.level + 1) {
        issues.push({
          file: fileName,
          line: current.line,
          type: 'heading-hierarchy',
          message: `Heading jumps from h${previous.level} to h${current.level} - should be sequential`,
          element: current.element,
          severity: 'warning'
        });
      }
    }

    // Check for forms without labels
    const inputRegex = /<input[^>]*>/g;
    const inputMatches = content.match(inputRegex) || [];
    inputMatches.forEach(input => {
      if (input.includes('type="text"') || input.includes('type="email"') || input.includes('type="password"')) {
        const hasId = input.match(/id="([^"]*)"/)
        const hasAriaLabel = input.includes('aria-label');
        const hasAriaLabelledby = input.includes('aria-labelledby');
        
        if (!hasAriaLabel && !hasAriaLabelledby) {
          // Check if there's a label with matching for attribute nearby
          const id = hasId?.[1];
          const hasMatchingLabel = id && content.includes(`for="${id}"`);
          
          if (!hasMatchingLabel) {
            issues.push({
              file: fileName,
              line: this.getLineNumber(content, input),
              type: 'unlabeled-input',
              message: 'Input field without accessible label',
              element: input,
              severity: 'error'
            });
          }
        }
      }
    });

    // Check for missing focus management
    const modalRegex = /role=["']dialog["']/g;
    if (content.match(modalRegex)) {
      if (!content.includes('focus') && !content.includes('focusManager') && !content.includes('autoFocus')) {
        issues.push({
          file: fileName,
          line: 0,
          type: 'focus-management',
          message: 'Modal/dialog without apparent focus management',
          element: 'Modal component',
          severity: 'warning'
        });
      }
    }

    // Check for color contrast issues (basic regex patterns)
    const colorRegex = /(text-gray-300|text-gray-400|text-gray-500)/g;
    const colorMatches = content.match(colorRegex) || [];
    if (colorMatches.length > 0) {
      issues.push({
        file: fileName,
        line: 0,
        type: 'color-contrast',
        message: `Potential low contrast colors found: ${[...new Set(colorMatches)].join(', ')}`,
        element: 'Various elements',
        severity: 'warning'
      });
    }

    return issues;
  }

  // Get line number for a string match
  getLineNumber(content, searchString) {
    const index = content.indexOf(searchString);
    if (index === -1) return 0;
    
    return content.substring(0, index).split('\n').length;
  }

  // Recursively audit all component files
  auditDirectory(dir) {
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      
      if (stat.isDirectory()) {
        this.auditDirectory(filePath);
      } else if (file.endsWith('.tsx') || file.endsWith('.jsx')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const issues = this.auditComponent(filePath, content);
        this.issues.push(...issues);
      }
    });
  }

  // Generate recommendations based on findings
  generateRecommendations() {
    const recommendations = [];
    
    const issueTypes = [...new Set(this.issues.map(issue => issue.type))];
    
    if (issueTypes.includes('missing-alt')) {
      recommendations.push({
        category: 'Images',
        priority: 'high',
        description: 'Add descriptive alt attributes to all images',
        example: '<img src="..." alt="Descriptive text about the image" />'
      });
    }

    if (issueTypes.includes('inaccessible-button')) {
      recommendations.push({
        category: 'Buttons',
        priority: 'high',
        description: 'Ensure all buttons have accessible text content',
        example: '<button aria-label="Close dialog">×</button>'
      });
    }

    if (issueTypes.includes('heading-hierarchy')) {
      recommendations.push({
        category: 'Headings',
        priority: 'medium',
        description: 'Maintain sequential heading hierarchy (h1 → h2 → h3)',
        example: 'Use h1 for main title, h2 for sections, h3 for subsections'
      });
    }

    if (issueTypes.includes('unlabeled-input')) {
      recommendations.push({
        category: 'Forms',
        priority: 'high',
        description: 'Associate labels with form inputs',
        example: '<label htmlFor="email">Email:</label><input id="email" type="email" />'
      });
    }

    if (issueTypes.includes('focus-management')) {
      recommendations.push({
        category: 'Focus Management',
        priority: 'medium',
        description: 'Implement proper focus management for modals and dynamic content',
        example: 'Use focusManager.trapFocus() or autoFocus attributes'
      });
    }

    if (issueTypes.includes('color-contrast')) {
      recommendations.push({
        category: 'Color Contrast',
        priority: 'medium',
        description: 'Ensure sufficient color contrast ratios (4.5:1 for normal text)',
        example: 'Use darker text colors on light backgrounds'
      });
    }

    this.recommendations = recommendations;
  }

  // Print audit results
  printResults() {
    console.log('\n🔍 ACCESSIBILITY AUDIT RESULTS\n');
    console.log('=' .repeat(50));
    
    if (this.issues.length === 0) {
      console.log('✅ No accessibility issues found!\n');
      return;
    }

    // Group issues by severity
    const errors = this.issues.filter(issue => issue.severity === 'error');
    const warnings = this.issues.filter(issue => issue.severity === 'warning');
    
    console.log(`\n❌ ERRORS: ${errors.length}`);
    console.log(`⚠️  WARNINGS: ${warnings.length}`);
    console.log(`📊 TOTAL ISSUES: ${this.issues.length}\n`);

    // Print errors
    if (errors.length > 0) {
      console.log('\n❌ CRITICAL ISSUES (Must Fix):\n');
      errors.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue.file}:${issue.line}`);
        console.log(`   Type: ${issue.type}`);
        console.log(`   Message: ${issue.message}`);
        console.log(`   Element: ${issue.element.substring(0, 100)}...`);
        console.log('');
      });
    }

    // Print warnings
    if (warnings.length > 0) {
      console.log('\n⚠️  WARNINGS (Should Fix):\n');
      warnings.forEach((issue, index) => {
        console.log(`${index + 1}. ${issue.file}:${issue.line}`);
        console.log(`   Type: ${issue.type}`);
        console.log(`   Message: ${issue.message}`);
        console.log(`   Element: ${issue.element.substring(0, 100)}...`);
        console.log('');
      });
    }

    // Print recommendations
    if (this.recommendations.length > 0) {
      console.log('\n💡 RECOMMENDATIONS:\n');
      this.recommendations.forEach((rec, index) => {
        const priority = rec.priority === 'high' ? '🔴' : rec.priority === 'medium' ? '🟡' : '🟢';
        console.log(`${index + 1}. ${priority} ${rec.category} (${rec.priority} priority)`);
        console.log(`   ${rec.description}`);
        console.log(`   Example: ${rec.example}`);
        console.log('');
      });
    }

    console.log('\n📋 NEXT STEPS:');
    console.log('1. Fix all critical errors first');
    console.log('2. Address warnings for better accessibility');
    console.log('3. Test with screen readers');
    console.log('4. Validate with automated tools like axe-core');
    console.log('5. Conduct user testing with accessibility users\n');
  }

  // Run the complete audit
  run() {
    console.log('🚀 Starting accessibility audit...');
    
    if (!fs.existsSync(this.srcPath)) {
      console.error('❌ Source directory not found:', this.srcPath);
      process.exit(1);
    }

    this.auditDirectory(this.srcPath);
    this.generateRecommendations();
    this.printResults();
    
    // Exit with error code if critical issues found
    const errors = this.issues.filter(issue => issue.severity === 'error');
    if (errors.length > 0) {
      process.exit(1);
    }
  }
}

// Run the audit
const auditor = new AccessibilityAuditor();
auditor.run();