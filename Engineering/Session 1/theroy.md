
## What is HTML?

**HTML (HyperText Markup Language)** is the **standard markup language** used to create and design the structure of web pages.

### Key Characteristics:

* **Not a programming language** – it’s a markup language.
* **Used to structure content**: paragraphs, headings, links, images, lists, etc.
* **Tells browsers** how to display the content.

---

## Basic HTML Structure

### Every HTML document follows this structure:

```html
<!DOCTYPE html>         <!-- Declares the HTML version (HTML5) -->
<html>                  <!-- Root of the HTML document -->
  <head>                <!-- Metadata like title, styles, scripts -->
    <title>Page Title</title>
  </head>
  <body>                <!-- Visible content shown on the browser -->
    <h1>My First Heading</h1>
    <p>My first paragraph.</p>
  </body>
</html>
```

---

## HTML Elements & Tags

HTML is made of **elements**, and each element is defined by **tags**.

### Example: Heading & Paragraph

```html
<h1>This is a Heading</h1>
<p>This is a paragraph.</p>
```

* `<h1>` to `<h6>` are **heading** tags.
* `<p>` defines a **paragraph**.
* Tags usually come in pairs: `<tag>content</tag>`

---

## HTML Links

```html
<a href="https://www.w3schools.com">This is a link</a>
```

* `<a>` is an **anchor tag**.
* `href` is an **attribute** that defines the link destination.

---

## HTML Images

```html
<img src="w3schools.jpg" alt="W3Schools.com" width="104" height="142">
```

* `<img>` is a **self-closing tag** (no `</img>`).
* `src`: source of the image
* `alt`: alternative text for accessibility
* `width` and `height`: image size

---

## What is a Language?

A **language** in web development refers to the **set of instructions and rules** used to write web or software content.

* **HTML** – Markup Language (structure)
* **CSS** – Styling Language (design)
* **JavaScript** – Programming Language (interactivity)

---

## What is a Framework?

A **framework** is a **pre-written collection of code and tools** that helps developers build websites or apps faster and easier by not starting from scratch.

### Examples:

| Category    | Language   | Framework Examples                          |
| ----------- | ---------- | ------------------------------------------- |
| Web Markup  | HTML       | No major frameworks (but used in templates) |
| Styling     | CSS        | Bootstrap, Tailwind CSS                     |
| Programming | JavaScript | React, Angular, Vue.js                      |
| Backend     | Python     | Django, Flask                               |
| Backend     | JavaScript | Node.js, Express.js                         |

Frameworks handle **repetitive tasks**, provide **components**, and enforce **structure**.

---