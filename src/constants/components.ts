export const componentsConfig = [
  { component: "Accordion", tab: "accordion", icon: "ExpandMore" },
  { component: "Button", tab: "button", icon: "SmartButton" },
  { component: "Card", tab: "card", icon: "CreditCard" },
  { component: "Modal", tab: "modal", icon: "ChatBubbleOutline" },
  { component: "Tabs", tab: "tabs", icon: "Tab" },
  { component: "IconButton", tab: "icon-button", icon: "Adjust" },
  { component: "Input", tab: "input", icon: "Input" },
  { component: "Radio", tab: "radio", icon: "RadioButtonChecked" },
  { component: "Select", tab:"select", icon: "List" },
  { component: "Switch", tab: "switch", icon: "ToggleOn" },
  { component: "Progress", tab: "progress", icon: "DonutLarge" },
];

export type ComponentConfigItem = typeof componentsConfig[number];
