Heroku Installation
- Install brew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
- Install heroku
brew tap heroku/brew && brew install heroku
- Check for the heroku version
heroku -v
- Login to heroku
heroku login
- Version Control with Git
https://git-scm.com
- Check git version
git --version
- Initialization of Git
git init
- To view .git on the VSCode, goto Code tab -> Preferences -> Settings -> Files: Exclude tab
- Check current status of the repository files like Untracked files
git status
- Create a .gitignore file and add files which needs to be excluded
- Add files to stage
git add <folder>... (OR) <files>...
- To add all files to stage
git add .
- Unstage the staged files
git rm --cached <file>...
- Commit all files
git commit -m "..."