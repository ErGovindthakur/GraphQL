# 📘 Git Essentials Guide

Welcome to the Git essentials guide. This file covers all the important Git commands you need for version control, collaboration, and managing your project efficiently.

---

## 📦 Project Initialization

| Command | Description |
|--------|-------------|
| `git init` | Initialize a new Git repository in your project folder. |
| `git clone <repo-url>` | Clone a remote repository to your local machine. |

---

## 📋 Tracking Changes

| Command | Description |
|--------|-------------|
| `git status` | View current changes and branch info. |
| `git add <file>` | Stage a specific file. |
| `git add .` | Stage all changed files. |
| `git commit -m "message"` | Save staged changes with a message. |

---

## 🔁 Moving Between Commits

| Command | Description |
|--------|-------------|
| `git reset --soft HEAD~1` | Go back one commit, keep changes staged. |
| `git reset --mixed HEAD~1` | Go back one commit, keep changes unstaged. |
| `git reset --hard HEAD~1` | ⚠️ Delete last commit and all changes. |
| `git checkout <commit>` | Switch to a specific commit (detached HEAD). |
| `git revert <commit>` | Create a new commit that undoes changes of a previous commit. |

---

## 🌿 Branching

| Command | Description |
|--------|-------------|
| `git branch` | List all branches. |
| `git branch <name>` | Create a new branch. |
| `git checkout <name>` | Switch to a branch. |
| `git checkout -b <name>` | Create and switch to a new branch. |
| `git merge <branch>` | Merge another branch into the current branch. |
| `git branch -d <branch>` | Delete a branch. |
| `git branch -D <branch>` | Force delete a branch. |

---

## 📡 Remote Repositories

| Command | Description |
|--------|-------------|
| `git remote add origin <url>` | Link your repo to a remote GitHub repo. |
| `git push -u origin main` | Push your main branch to GitHub. |
| `git push` | Push committed changes. |
| `git pull` | Pull latest changes from remote. |
| `git fetch` | Download changes without merging. |

---

## 🔍 Logs & Diffs

| Command | Description |
|--------|-------------|
| `git log` | Full commit history. |
| `git log --oneline` | Short commit history. |
| `git diff` | View unstaged changes. |
| `git diff --cached` | View staged changes. |

---

## 🔥 Undo & Clean

| Command | Description |
|--------|-------------|
| `git checkout -- <file>` | Discard local changes in file. |
| `git reset <file>` | Unstage a file (but keep changes). |
| `git clean -f` | Delete untracked files. |

---

## 💼 Stash (Temporary Storage)

| Command | Description |
|--------|-------------|
| `git stash` | Save uncommitted changes temporarily. |
| `git stash pop` | Restore last stashed changes. |

---

## 🧠 Tips

- `git checkout -` — switch to the previous branch.
- `git reflog` — see the history of all actions, great for recovering lost commits.
- Use `.gitignore` to prevent tracking of unwanted files.

---

## ✅ Recommended Workflow

1. `git pull origin main`
2. `git checkout -b feature-branch`
3. Make changes 🚀
4. `git add . && git commit -m "feature added"`
5. `git push -u origin feature-branch`
6. Create PR (pull request) and merge via GitHub

---

### Happy Coding! 💻✨
