# Donna CLI

Donna helps you get to work faster by opening all the apps and files you need for a specific project automatically. Need that local server to be launched? That sketch file opened? Donna got you covered.

## Get started

First, hire Donna with `npm install donna-cli -g`.

Then all you need to do is create a `donna.json` file at the root of your project describing what you want Donna to take care of.

```
{
  "instructions": [
    {
      "action": "open",
      "args": {
        "file": "/",
        "app": "Atom"
      }
    },
    {
      "action": "open",
      "args": {
        "app": "Mamp Pro"
      }
    },
    {
      "action": "run",
      "args": {
        "cmd": "gulp"
      }
    }
  ]
}
```

Then just call `donna`. Yeah. Just like that.

## Actions

Actions represent the type of task Donna can take care of. Right now you can use 2 different actions : `open` that fires up any app and `run` that executes any command in the terminal.

## Args

For every action, you can specify a number of arguments. For example the path of a specific file to open, or a whether to run a command in a new tab.
