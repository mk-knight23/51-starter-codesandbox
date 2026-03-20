# Update Dependencies

This workflow keeps the playground dependencies up-to-date and secure.

## Steps

### 1. Check for Updates
```bash
# Check for outdated packages
npm outdated

# Check for security vulnerabilities
npm audit
```

### 2. Update Dependencies

#### Safe Updates (Patch/Minor)
```bash
# Update packages to latest compatible versions
npm update

# Or use npm-check-updates for major versions
npx npm-check-updates -u
npm install
```

#### Individual Package Updates
```bash
# Update a specific package
npm install package@latest

# Update Vue ecosystem
npm install vue@latest vue-router@latest pinia@latest
```

### 3. Test After Updates
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Type check
npm run build

# Dev server
npm run dev
```

### 4. Verify Functionality
- [ ] All demo components load
- [ ] TypeScript compilation works
- [ ] No console errors
- [ ] Styling renders correctly
- [ ] All interactions work

## Dependency Guidelines

### Core Dependencies (Keep Updated)
- `vue` - Latest 3.x
- `vue-router` - Latest 4.x
- `pinia` - Latest 3.x
- `@vueuse/core` - Latest compatible

### Dev Dependencies (Keep Updated)
- `vite` - Latest 7.x
- `typescript` - Latest 5.x
- `tailwindcss` - Latest 4.x
- `vue-tsc` - Latest compatible

### Breaking Changes
When major versions update:
1. Check migration guides
2. Test thoroughly in playground
3. Update code examples if syntax changed
4. Update README if needed

## Security Updates

```bash
# Fix security vulnerabilities
npm audit fix

# Force fix (may break things)
npm audit fix --force
```

## Rollback if Needed

```bash
# View package history
npm history

# Reinstall specific version
npm install package@previous-version

# Or restore from Git
git checkout HEAD -- package.json package-lock.json
npm install
```

## Monthly Maintenance

Recommended monthly routine:
1. Run `npm outdated`
2. Review changelogs for major updates
3. Update non-breaking changes
4. Test thoroughly
5. Update this workflow if needed
