#Scout3 Documentation Wiki
###Table of Contents
1. [Setup](https://github.com/josephbabbitt/Scout3/wiki/#--setup-)
2. [scout3-input](https://github.com/josephbabbitt/Scout3/wiki/#--inputs-scout3-input)
3. [scout3-screen](https://github.com/josephbabbitt/Scout3/wiki/#--screens-scout3-screen)
4. [Global javacript functions](https://github.com/josephbabbitt/Scout3/wiki/#--functions)
5. [Creating your own Scout3 tags](https://github.com/josephbabbitt/Scout3/wiki/#--creating-your-own-scout3-tags)
- SetUp 
- 
- You must include on your page:
    - Jquery
    - X-tag core
    - Scout3.js
    Want all 3? Here's a zip
- create all of your tags and make sure that they all have is attributes **EVERY TAG NEEDS AN `IS="SomethingUnique"`**
- Inputs `<scout3-input>`
- 
- A scout3-input is a regular input with some added functionality
    - You can create any input from one tag using the `type="xxx"`
        - Types: textarea, checkbox, number, date, email, month, number, password, range, search, submit, tel, text, time, url, week, radio, select
    - A label for the input can be made by passing the `label="xxx"`
    - The values can be read as soon as the user inputs the data using the Scout3 format
    - Setting up a Select or Radio Scout3 tag
	-Select:
		-Use the type attr 'select'
		-add the attr 'options'
		- set the value of options to all of your options separated by _
		- Example: `<scout3-input type="select" options="Option1_Option2_Option3_Option4" is="Select1">`
- The nitty gritty of the tag:
    - A simple example tag of: `<scout3-input type="textarea" label="I'm a label" is="TextArea1"` will produce:
        - a label with the value of I'm a label
        - a textarea tag
        - listeners for all of the Scout3 functions
    - How it works:
        - Listeners:
            - Getting value on entry: Uses the click function of x-tags and waits for onblur of element to report value.
- Clases:
    - If you add a class to the Scout3 version of the tag the generated tag will also have those effects due to inheritance
    - If you only want to target a spefic part of the `Scout3` tag children then use [css selectors](http://www.w3schools.com/cssref/css_selectors.asp)
    - Additionally for radio buttons and selectors every option has a class of **child+childnumber** (starting at 0)
- Screens `<scout3-screen>`
-
- A scout-screen is a container for any html that can be shown or hidden using the `s3SetScreen` function
- Can be used with any content
- Any content inside the tag will be hidden when the `s3SetScreen` function is called
- Requirements:
    - Must have a `screen` and `active` attributes
        - Screen:
            - is the **unique** identifier for the screen
            - not an ID but is used to indentify between different screens
            - EX: `<scout3-screen active="yes" `**screen="examplename"**`>`
        - Active:
            - "yes" or "no" option
            - Tells Scout3 if the screen should be shown
            - **If changed in any code, the changes will be reflected by the element**
            - EX: `<scout3-screen screen="ex" `**active="yes"**`>`
- Functions
-
- `s3SetScreen`
    - Requirements:
        - must include a screen name to go to ex: `s3SetScreen(exscreenname)`
- Creating your own `<Scout3>` tag
- 
- Register a new xtag element with the name `scout3-yourname`
- include within the lifecycle `created: function(){checkid($(this).attr('is'),'scout3-YOURTAGNAME');}`<sup>1</sup>

##### Footnotes:
1. Refer to the [X-Tag](http://x-tag.github.io/) documentation for more information on creating custom tags