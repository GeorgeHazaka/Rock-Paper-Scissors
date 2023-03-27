# Rock Paper Scissors


Rock Paper Scissors is an interesting and simple hand game played by many people around the world for generations. It is often used as a fair choosing method between two players in order to settle a dispute or make an unbiased group decision. This site is designed to play this well-known game on your device.

Users of this application will be able to experience this game with some images and animations. So it is targeted towards people who want to play a fair game with some nice animations. In this game you are playing against a fully automated computer that chooses one of the options randomly.

![Several screen sizes devices showing how the website looks in each of them](documentation/responsive-rock-paper-scissors.png)

## Design
----

### Flow Diagram

To structure and aid in creating the website, a basic flow diagram was created which is linked below.

[Flow Diagram]()

### Wireframes

Please see below, a link to wireframes for the site layout.

[Wireframes]()

### Colour Scheme

+ One main colour was used in this website which suit the background. The colour is:

    ![#E3E0A6 light-yellow color](documentation/lightyellow%23E3E0A6.png)

+ And two secondary colours were used for the scores result. The colours are:

    ![#A8FC2A green-yellow color](documentation/greenyellow%23A8FC2A.png) ![#FC0303 red color](documentation/red%23FC0303.png)

### Typography

To make this application seem like a playful application, these two fonts were chosen:
+ The font [Tilt Warp](https://fonts.google.com/?query=Tilt+Warp) was applied to all of the elements.
+ The font [Climate Crisis](https://fonts.google.com/?query=Climate+Crisis) was applied only to the main heading.

## Features
----

### Existing Features

+ #### The Header
    + Featured at the top of the page, the header shows the main headining of the website.
    + The main heading used the [Climate Crisis](https://fonts.google.com/?query=Climate+Crisis) unique font to make it look special.

![Rock, Paper, Scissors as main heading](documentation/main-heading-rock-paper-scissors.png)

+ #### The Section
    + ##### Weapons Area
        + The weapons area is to allow the user to click on any weapon they want.
        + There are a total of three weapons to choose from.

        <br>

        ![Weapons area of Rock,Paper,Scissors](documentation/weapons-rock-paper-scissors.png)

    + ##### Fighting Area
        + Fighting Area is to compare the player's weapon with the computer's weapon.
        + These two images correspond to the player's choice and the computer's choice.
        + Three potential results out of the fight: Win, Lose or Draw.

        <br>

        ![player selection versus computer selection](documentation/player-vs-computer-rock-paper-scissors.png)

    + ##### Draw Message Area
        + The Draw Message only appears when the computer chose the same weapon as the player's.
        + The Draw Message also shows which weapon the computer has chosen.

        <br>

        ![draw message](documentation/draw-message-rock-paper-scissors.png)

+ #### The Footer
    +  The Footer is to show the socre of both the player and the computer

![player score and computer score](documentation/player%26computer-score.png)

### Features Left to Implement
+ Add an online feature so that a player can play vs another player instead of a computer.
+ Add difficulty options when playing against computer.

## Testing
----
+ I tested that the page work in different browsers: Firefox, Brave, Chrome, Microsoft Edge, Safari.
+ I confirm that the project is responsive, looks good and functions on all standard screen sizes using both the devtools device toolbar and [Am I Responsive?](https://ui.dev/amiresponsive?url=https://georgehazaka.github.io/Rock-Paper-Scissors/) website.
+ I confirm that all buttons (weapons) work properly.

### Manual Testing

+ #### Buttons Testing
    | Feature             | Expect                                            | Action                      | Result                                |
    | ------------------- | ------------------------------------------------- | --------------------------- | ------------------------------------- |
    | **Rock button**     | When clicked the player's weapon becomes a rock   | Clicked the rock button     | The player's weapon became a rock     |
    | **Paper button**    | When clicked the player's weapon becomes a paper  | Clicked the paper button    | The player's weapon became a paper    |
    | **Scissors button** | When clicked the player's weapon becomes scissors | Clicked the scissors button | The player's weapon became a scissors |

+ #### Winning Animation Testing
    | Feature               | Expect when winning | Action | Result when winning |
    | --------------------- | ------------------- | ------ | ------------------- |
    | **Rock button**       | When clicked the player's weapon becomes an angry version of a rock and it rushes to attack the computer's weapon | Clicked the rock button | The player's weapon became an angry version of a rock and it attacked the computer's weapon |
    | **Paper button**      | When clicked the player's weapon becomes an angry version of a paper and it rushes to attack the computer's weapon | Clicked the paper button | The player's weapon became an angry version of a paper and it attacked the computer's weapon |
    | **Scissors button**   | When clicked the player's weapon becomes an angry version of scissors and it rushes to attack the computer's weapon | Clicked the scissors button | The player's weapon became an angry version of scissors and it attacked the computer's weapon |

+ #### Losing Animation Testing
    | Feature             | Expect when losing | Action | Result when losing |
    | ------------------- | ------------------ | ------ | ------------------ |
    | **Rock button**     | When clicked the player's weapon becomes an angry version of a rock and it rushes to attack the computer's weapon | Clicked the rock button | The player's weapon became an angry version of a rock and it attacked the computer's weapon |
    | **Paper button**    | When clicked the player's weapon becomes an angry version of a paper and it rushes to attack the computer's weapon | Clicked the paper button | The player's weapon became an angry version of a paper and it attacked the computer's weapon |
    | **Scissors button** | When clicked the player's weapon becomes an angry version of scissors and it rushes to attack the computer's weapon | Clicked the scissors button | The player's weapon became an angry version of scissors and it attacked the computer's weapon |