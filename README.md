# Keyword-O-Mat

<div align="center">
  <img src="assets/keyword-o-mat__logo.png" />

> _"Amp up your workflows. Quickly rotate related keywords that are commonly used in a variety of popular languages."_

</div>

## Examples

<details open>
  <summary>Cycle variables, booleans and commonly used keywords</summary>
  <img src="assets/kom__bool.gif" alt="Example CSS" width="480"/>

  <img src="assets/kom__css.gif" alt="Example CSS" width="480"/> 
</details>

<details>
  <summary>Multi cursor selection compatible <em>- click to unfold</em></summary>
  <img src="assets/kom__mc__css.gif" alt="Example Multi cursor selection css" width="480"/>

  <img src="assets/kom__mc.gif" alt="Example Multi cursor selection css" width="480"/>     
</details>

<details>
  <summary>Extension compatible - Auto Rename Tag <em>- click to unfold</em></summary>
  <img src="assets/kom__art.gif" alt="Example Auto Rename Tag Extension" width="480"/> 
</details>

## How To Use

|                | **Default Keymaps** | **Commands**           |
| -------------- | ------------------- | ---------------------- |
| Cycle Forward  | `Alt+a`             | `K-O-M Cycle Forward`  |
| Cycle Backward | `Alt+x`             | `K-O-M Cycle Backward` |

<sub>The default keybindings are inspired by VIM's _add_ `Ctrl-a` and _subtract_ `Ctrl-x`. Of course , you can remap them to your preference.</sub>

## Keyword List

| _Rotate symbols and words that are in one row_                                     |
| ---------------------------------------------------------------------------------- |
| `==` , `!=`                                                                        |
| `_` , `-`                                                                          |
| `+` , `-`                                                                          |
| `-=` , `+=`                                                                        |
| `&&` , `\|\|`                                                                      |
| `and` , `or`                                                                       |
| `true` , `false`                                                                   |
| `if` , `else`                                                                      |
| `YES` , `NO`                                                                       |
| `yes` , `no`                                                                       |
| `on` , `off`                                                                       |
| `running` , `stopped`                                                              |
| `const` , `let`                                                                    |
| `private` , `protected` , `public`                                                 |
| `push` , `pull`                                                                    |
|                                                                                    |
| `div` , `p` , `span`                                                               |
| `max` , `min`                                                                      |
| `ul` , `ol`                                                                        |
| `class` , `id`                                                                     |
| `px` , `%` , `em`                                                                  |
| `left` , `right`                                                                   |
| `top` , `bottom`                                                                   |
| `margin` , `padding`                                                               |
| `height` , `width`                                                                 |
| `absolute` , `relative`                                                            |
| `h1` , `h2` , `h3` , `h4` , `h5` , `h6`                                            |
| `png` , `jpg` , `gif`                                                              |
| `linear` , `radial`                                                                |
| `horizontal` , `vertical`                                                          |
| `show` , `hide`                                                                    |
| `mouseover` , `mouseout`                                                           |
| `mouseenter` , `mouseleave`                                                        |
| `add` , `remove`                                                                   |
| `up` , `down`                                                                      |
| `before` , `after`                                                                 |
| `slow` , `fast`                                                                    |
| `small` , `large`                                                                  |
| `even` , `odd`                                                                     |
| `inside` , `outside`                                                               |
|                                                                                    |
| `include` , `require`                                                              |
| `Time` , `Date`                                                                    |
| `present` , `blank`                                                                |
| `while` , `until`                                                                  |
| `only` , `except`                                                                  |
| `create` , `update`                                                                |
| `new` , `edit`                                                                     |
| `get` , `post` , `put` , `patch`                                                   |
|                                                                                    |
| `one` , `two` , `three` , `four` , `five`                                          |
| `first`, `second`, `thrid`, `forth`, `fifth`, `last`                               |
| `primary` , `secondary` , `tertiary` , `quaternary` , `quinary`                    |
| `Monday` , `Tuesday` , `Wednesday` , `Thursday` , `Friday` , `Saturday` , `Sunday` |
| `TODO` , `DOING` , `DONE` , `CANCELED`                                             |
| `NOW` , `LATER`                                                                    |

<sub>\*For single words and properties to be cycled, its sufficient when the cursor is placed above them.<br>
Symbols and linked words like `&&` or element-`one` currently require to be selected. </sub>

## Known Issues

Currently, missing additional functionalities. E.g, file type specific keyword overrides or defining custom keyword maps inside a user's settings.json. As the current state fulfills the requirements for the times I'm using VSCodium and the extension having a small user base I didn't came to invest the time developing those features yet.

If you like to use the extension, leaving a star on the repo or a rating in the marketplace lets me know that you use the extension and that you would like to see more features. Also, bug reports, feature- and pull requests are welcome.

## Release Notes

<sub>`*.*.n` patches are tracked via commit history</sub>

### 0.1.0

Initial release

## Credits

Similar extensions and projects that served as an inspiration.

-  [Toggle Boolean](https://github.com/silesky/vscode-toggle-bool)
-  [Swap Keywords](https://github.com/L13/vscode-swap/tree/master/src)
-  [vim-cycle](https://github.com/zef/vim-cycle)
