Heroku Installation
- Install brew -> /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
- Install heroku -> brew tap heroku/brew && brew install heroku
- Check for the heroku version -> heroku -v
- Login to heroku -> heroku login


Setup Version Control with Git -> https://git-scm.com
- Check git version -> git --version
- Initialization of Git -> git init
- To view .git on the VSCode, goto Code tab -> Preferences -> Settings -> Files: Exclude tab
- Check current status of the repository files like Untracked files -> git status
- Create a .gitignore file and add files which needs to be excluded
- Add files to stage -> git add <foldername>... (OR) <filenames>...
- To add all files to stage -> git add .
- Unstage the staged files -> git rm --cached <filename>...
- Commit all files -> git commit -m "..."


Set up SSH(Secure Shell) for GitHub -> ls -a -l ~/.ssh (shows all ssh files if any (id_rsa, id_rsa.pub)) 
- Generate ssh key -> ssh-keygen -t rsa -b 4096 -C "myaqoob71@gmail.com"
where   t -> type
        b -> bytes (commonly 4096 bytes)
        C -> comments (like mail address)
- Start the SSH agent -> eval "$(ssh-agent -s)"
Output: Agent pid <number>
- Register SSH
ssh-add -K ~/.ssh/id_rsa
        (OR)
ssh-add -K /var/root/.ssh/id_rsa
where   K -> use this option only for Mac


- Create a repository in GitHub
- Push to existing repository using command
git remote add origin https://github.com/myaqoob71/node-weather-website.git  ->Creates a remote connection 
- Before running the below 2 commands we need to create a connection with SSH through GitHub 
- Goto GitHub profile -> Settings -> SSH and GPG keys -> Add New SSH key -> In VSCode terminal -> cat /var/root/.ssh/id_rsa.pub (OR) 
cat ~/.ssh/id_rsa.pub -> We get a long encrypted key -> Copy and paste it in GitHub
-Tests your GitHub connection with servers -> ssh -T git@github.com -> git branch -M main -> git push -u origin main  -> pushing code to upstream "main"


- Setup SSH for Heroku -> heroku keys:add (Looks through the ssh directory and asks which ssh keys to upload)
- Create a heroku application -> heroku create <application-name> (This command gives 2 details)
1. Tells about the successful creation of heroku application
2. Provides 2 URL's -> (i): Live URL for the app (ii): git repository URL
- For live app URL to run there are 3 changes to do:
1. We need to create a script in package.json to start running the app.js
"scripts": {
    "start": "node src/app.js"
  }
2. In app.js, we need to make changes to listen() as heroku uses its own port to run application
const port = process.env.PORT || 3000 -> heroku uses process.env.PORT and if we are running the app locally it uses 3000 port
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
3. Also remove the dependency on localhost for fetch call in app.js
fetch('http://localhost:3000/weather?address=' + location) -> Change to -> fetch('/weather?address=' + location) 


- Check remote -> git remote
Output:
heroku
origin

- Deploy code to heroku -> git push heroku main (Used for heroku to see latest commits has been pushed)














NOTE: If using Windows machine use git bash command line prompt for all the terminal commands