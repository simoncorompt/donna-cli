# Donna CLI

Donna helps you get to work faster by opening all the apps and files you need for a specific project automatically. Need that local server to be launched? That sketch file opened? Donna got you covered.

## Get started

First, hire Donna with `npm install donna-cli -g`.

Then all you need to do is to create a `donna.json` file at the root of your project describing what you want Donna to take care of.

```json
{
  "do": [
    ["open", "Atom", "/"],
    ["open", "Mamp Pro"],
    ["run", "gulp"],
    ["sleep", 2],
    ["browse", "localhost:3000"]
  ]
}
```

Then just call `donna`. Yeah. Just like that.


## CLI commands

Alternatively, you can use the cli to create your `donna.json`. Just open a Terminal at the root of your project and start listing what you want Donna to do for you.

```bash
donna init
donna add open "Atom" /
donna add open "Mamp Pro"
donna add run "gulp"
donna add sleep 2
donna add browse localhost:3000
```
Then call `donna`, as usual.

## Bookmarks

It can be pretty exhausting having to cd into the right folder every time to use donna. Good news is: you don't have to. Next time you are in the root of a donna project, just bookmark it and it will create a global shortcut that you can use everywhere!

```bash
donna bookmark <bookmarkName>
donna launch <bookmarkName>  # This one can be called from anywhere!!
```

Here are some other commands to help you manage your bookmarks:
- `list` lists all your available bookmarks as well as the path to the bookmarked directory
- `remove <bookmarkName>` deletes the bookmark from Donna's memory


## Actions

Actions represent the type of task Donna can take care of.
- `open` fires up any app
- `run` executes any command in the terminal
- `browse` opens any url to your favorite browser
- `sleep` waits a few second before running the next action

## Args

For every action, you can specify a number of arguments. For example the path of a specific file to open, or a whether to run a command in a new tab.
