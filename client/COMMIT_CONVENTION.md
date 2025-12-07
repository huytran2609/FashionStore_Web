# Git Commit Message Convention

This project follows the [Conventional Commits](https://www.conventionalcommits.org/) specification, which provides an easy set of rules for creating an explicit commit history.

## Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

## Structure

### 1. Type (Required)

The type must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc.)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **build**: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- **ci**: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- **chore**: Other changes that don't modify src or test files
- **revert**: Reverts a previous commit

### 2. Scope (Optional)

The scope should be the name of the package/component affected. Examples:

- `category`: Category-related changes
- `cart`: Shopping cart functionality
- `layout`: Layout system changes
- `auth`: Authentication system
- `api`: API integration
- `component`: Generic component changes
- `naming`: Naming convention changes
- `config`: Configuration changes

**Note**: Use lowercase and be specific. If the change affects multiple scopes, use `*` or omit the scope.

### 3. Subject (Required)

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No dot (.) at the end
- Maximum 72 characters
- Describe what the commit does, not what it did

**Good examples:**
```
feat(cart): add product quantity validation
fix(auth): resolve login redirect issue
refactor(category): consolidate category pages
```

**Bad examples:**
```
feat(cart): Added product quantity validation.
fix(auth): Fixed login redirect issue
refactor(category): Consolidating category pages into unified component
```

### 4. Body (Optional)

- Use the imperative, present tense
- Explain the **what** and **why** vs. the **how**
- Can include multiple paragraphs
- Wrap at 72 characters
- Separate from subject with a blank line

**Example:**
```
refactor(category): consolidate category pages into unified component

- Remove duplicate category pages (beauty, kids, lifestyle, men, women)
- Create single unified Category component that handles all categories
- Use useLocation to dynamically determine category from URL path
- Update routes to redirect all category paths to unified Category component
```

### 5. Footer (Optional)

- Reference issues that this commit closes
- Use keywords: `Closes`, `Fixes`, `Resolves`
- Format: `Closes #123, #456`

**Example:**
```
fix(auth): resolve login redirect issue

The login redirect was not working correctly after successful authentication.

Fixes #123
```

## Breaking Changes

If your commit introduces a breaking change, add `BREAKING CHANGE:` in the footer section.

**Format:**
```
<type>(<scope>): <subject>

BREAKING CHANGE: <description>
```

**Example:**
```
refactor(naming): standardize folder naming to camelCase

BREAKING CHANGE: All folder names changed from PascalCase to camelCase.
Import paths have been updated accordingly.
```

## Examples

### Feature
```
feat(cart): add product quantity validation

Add validation to prevent users from adding more items than available
in stock. Display error message when quantity exceeds available stock.

Closes #45
```

### Bug Fix
```
fix(auth): resolve login redirect issue

The login redirect was not working correctly after successful authentication.
Fixed by updating the redirect logic in the auth middleware.

Fixes #123
```

### Refactoring
```
refactor(category): consolidate category pages into unified component

- Remove duplicate category pages (beauty, kids, lifestyle, men, women)
- Create single unified Category component that handles all categories
- Use useLocation to dynamically determine category from URL path
- Update routes to redirect all category paths to unified Category component
- Remove redundant API functions
- Fix layout system inconsistency by removing direct Header/Footer imports
```

### Documentation
```
docs: add coding conventions and commit guidelines

- Add comprehensive coding conventions document
- Document naming conventions, file structure, and best practices
- Add commit message guidelines following Conventional Commits spec
```

### Style
```
style: format code with Prettier

Run Prettier to ensure consistent code formatting across the project.
```

### Performance
```
perf(api): optimize product list loading

- Implement pagination for product lists
- Add caching for frequently accessed data
- Reduce API call frequency by batching requests

Improves page load time by 40%.
```

## Commit Message Best Practices

1. **Be Specific**: Clearly describe what changed and why
2. **Be Concise**: Keep the subject line under 72 characters
3. **Use Imperative Mood**: Write as if completing the sentence "This commit will..."
4. **Explain Why**: In the body, explain why the change was made
5. **Reference Issues**: Link to related issues or pull requests
6. **One Logical Change**: Each commit should represent one logical change

## Common Patterns

### Multiple Related Changes
If you have multiple related changes, group them in one commit:

```
refactor(naming): standardize folder and file naming to camelCase

- Rename all layout folders from PascalCase to camelCase
- Rename all component folders from PascalCase to camelCase
- Rename all asset folders from PascalCase to camelCase
- Standardize all component files to use index.jsx pattern
- Update all import statements throughout codebase
```

### Separate Unrelated Changes
If changes are unrelated, use separate commits:

```
refactor(category): consolidate category pages
refactor(naming): standardize folder naming to camelCase
```

## Scope Guidelines

### When to Use Scope

- ✅ When the change is specific to one area: `feat(cart): add checkout`
- ✅ When it helps categorize the commit: `fix(auth): resolve token expiry`
- ✅ When multiple commits affect the same area: `refactor(api): improve error handling`

### When to Omit Scope

- ❌ When the change affects multiple areas: `refactor: improve code organization`
- ❌ When the scope is too generic: `feat(app): add feature`
- ❌ When the type is self-explanatory: `docs: update README`

## Type Selection Guide

| Type | When to Use | Example |
|------|-------------|---------|
| `feat` | Adding a new feature | `feat(cart): add wishlist functionality` |
| `fix` | Fixing a bug | `fix(auth): resolve login redirect issue` |
| `docs` | Documentation changes | `docs: update API documentation` |
| `style` | Code style changes | `style: format code with Prettier` |
| `refactor` | Code refactoring | `refactor(category): consolidate pages` |
| `perf` | Performance improvements | `perf(api): optimize data fetching` |
| `test` | Adding/updating tests | `test(cart): add unit tests for checkout` |
| `build` | Build system changes | `build: update webpack configuration` |
| `ci` | CI/CD changes | `ci: add GitHub Actions workflow` |
| `chore` | Maintenance tasks | `chore: update dependencies` |
| `revert` | Reverting a commit | `revert: revert "feat(cart): add checkout"` |

## Validation

Before committing, ensure your message:

- ✅ Starts with a valid type
- ✅ Has a scope (if applicable) in parentheses
- ✅ Has a colon and space after scope
- ✅ Has a subject under 72 characters
- ✅ Uses imperative mood
- ✅ Body is wrapped at 72 characters (if present)
- ✅ Footer references issues (if applicable)

## Tools

### Commitizen

Install Commitizen for interactive commit message creation:

```bash
npm install -g commitizen
npm install --save-dev cz-conventional-changelog
```

Add to `package.json`:
```json
{
  "config": {
    "commitizen": {
      "path": "./node_modules/cz-conventional-changelog"
    }
  }
}
```

Use: `git cz` instead of `git commit`

### Commitlint

Install commitlint to validate commit messages:

```bash
npm install --save-dev @commitlint/cli @commitlint/config-conventional
```

Create `commitlint.config.js`:
```js
module.exports = {
  extends: ['@commitlint/config-conventional']
};
```

## Resources

- [Conventional Commits Specification](https://www.conventionalcommits.org/)
- [Angular Commit Message Guidelines](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)
- [Commitlint](https://commitlint.js.org/)
- [Commitizen](http://commitizen.github.io/cz-cli/)

---

**Last Updated**: 2024
**Maintained by**: Development Team

