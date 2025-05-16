# Children's Book Website

A beautiful interactive website for "The Amazing Adventure" children's book with page navigation and text overlays.

## Features

- Separate HTML file for each book page
- Interactive navigation with next/previous buttons
- Text overlay on images
- Responsive design for all devices
- Page turning animations
- Progress indicator
- Touch-friendly navigation (swipe support)
- Keyboard navigation (arrow keys)

## Structure

- `index.html` - Cover page
- `page1.html` through `page5.html` - Book pages
- `src/styles/main.css` - All styling
- `src/js/navigation.js` - Navigation logic
- `public/images/` - Directory for book images

## How to Add/Edit Pages

1. Create a new HTML file using the existing pages as templates
2. Update the TOTAL_PAGES constant in navigation.js
3. Add your images to the public/images directory
4. Update the text content in the new HTML file

## Responsive Design

The website is fully responsive and works on:
- Mobile phones
- Tablets
- Desktop computers

## Customization

You can easily customize:
- Colors by modifying CSS variables in :root
- Fonts by changing the font-family properties
- Animation timing by adjusting the --transition-speed variable