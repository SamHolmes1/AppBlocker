# Lockout Labyrinth - Website Blocker

Lockout Labyrinth is an anti-procrastination website blocker that requires users to complete a task before they can get back to browsing because it is all too easy to click ‘ignore’ on site-blocking apps. 

Created using Electron-Vite and React with Typescript, the app will edit the hosts file to block access to user-selected websites and require completion of a puzzle before unblocking. There are three puzzles available: a maths puzzle, quiz and maze and 5 levels of difficulty that can be selected.

The app makes calls to an API created using Express.js and Mongoose with MongoDB, hosted [here](https://boolean-hooligans-backend.onrender.com/api/getOne/gaming) and found [here](https://github.com/vh232/project-backend) on github.

**Please be aware the app requires admin rights and will prompt user for their password upon blocking and unblocking.**

Created as the final project in the Northcoders Software Development bootcamp by [Ronnie Williams](https://github.com/Willo84uk/), [Vicky Hill](https://github.com/vh232), [Beck Unsworth](https://github.com/BeckBob), [Chris Gladney](github.com/chris-gladney), [Sam Holmes](https://github.com/SamHolmes1)


## Getting Started

### Minimum Requirements

- Node.js: _v20.4.0_

### Installation

1. Clone this repository

```
$ git clone https://github.com/SamHolmes1/AppBlocker.git
```

2. Run `npm install` to install dependencies listed in the `package.json`

3. Run `npm run dev` to host a version locally.

### How to Use

As a user you are able to:

- Select sites to block from a list of suggestions
- Add your own sites to block
- Choose the puzzles seen in 'unblock mode' (maths puzzle, quiz, maze)
- Choose the level of difficulty from 1-5
- Unblock either individual sites or all blocked sites in unblock mode
- Have a saved list of 'my sites' for ease when next using the app

### Credits

The app renders a maze created by Tom Liangg [(source)](https://github.com/tomliangg).