module.exports = {
  display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_BUTTONS', 'LINK_BUTTONS', 'BLOCK_TYPE_DROPDOWN', 'HISTORY_BUTTONS'],
  INLINE_STYLE_BUTTONS: [
    {label: 'Bold', style: 'BOLD', className: 'custom-css-class'},
    {label: 'Italic', style: 'ITALIC', className: 'custom-css-class'},
    {label: 'Underline', style: 'UNDERLINE', className: 'custom-css-class'}
  ],
  BLOCK_TYPE_DROPDOWN: [
    {label: 'Normal', style: 'unstyled', className: 'custom-css-class'},
    {label: 'Heading Large', style: 'header-one', className: 'custom-css-class'},
    {label: 'Heading Medium', style: 'header-two', className: 'custom-css-class'},
    {label: 'Heading Small', style: 'header-three', className: 'custom-css-class'}
  ],
  BLOCK_TYPE_BUTTONS: [
    {label: 'UL', style: 'unordered-list-item', className: 'custom-css-class'},
    {label: 'OL', style: 'ordered-list-item', className: 'custom-css-class'}
  ]
}