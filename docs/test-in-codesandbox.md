# Test in CodeSandbox

This workflow helps test the playground in CodeSandbox environment.

## Steps

### 1. Prepare for CodeSandbox
- Ensure all changes are committed
- Verify build works locally: `npm run build`
- Check package.json scripts

### 2. Create CodeSandbox
- Go to [codesandbox.io](https://codesandbox.io)
- Click "Import Project"
- Paste your GitHub repository URL
- Wait for dependencies to install

### 3. Verify Functionality
- [ ] All 4 demo steps load correctly
- [ ] Navigation between steps works
- [ ] Reset buttons function properly
- [ ] All interactive elements respond
- [ ] Console shows no errors
- [ ] Styling looks correct

### 4. Test Interactivity
- **Step 1**: Counter increments/decrements, reset works
- **Step 2**: Add/edit/delete todos, bulk actions work
- **Step 3**: Theme switching persists, reset works
- **Step 4**: All inputs update preview, randomize works

### 5. Browser Compatibility
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if available)

### 6. Performance Check
- Initial load time < 3 seconds
- Smooth transitions between steps
- No lag on interactions

## Common Issues

### Build Fails
- Check TypeScript errors
- Verify all imports exist
- Ensure Tailwind CSS v4 syntax

### Styling Issues
- Clear browser cache
- Check Tailwind classes
- Verify scoped styles

### Interactive Elements Don't Work
- Check console for errors
- Verify event handlers are bound
- Ensure refs are properly accessed

## CodeSandbox Tips

- Use "Sync to GitHub" for live updates
- Enable "Auto Preview" for faster iteration
- Use "Export to ZIP" for offline testing
