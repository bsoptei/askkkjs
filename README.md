# askkkjs
Simple REPL for communication with a TCP server using the console

## Example: connect to and communicate with [kavakava](https://github.com/bsoptei/kavakava)

```p
askkkjs:
update John Doe;42;

OK

askkkjs:
update Big Oak Tree;420;

OK

askkkjs:
bykeys John Doe;

{"John Doe": "42"}

askkkjs:
byvals 420;

{"Big Oak Tree": "420"}

askkkjs:
```
