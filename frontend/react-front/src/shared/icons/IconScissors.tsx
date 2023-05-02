interface Props {
  width?: string
  height?: string
  className?: string
  color?: string
}
const IconScissors = ({
  width = '24',
  height = '24',
  className,
  color = 'currentColor',
}: Props) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={height}
      width={width}
      className={className}
      fill={color}
      viewBox="0 0 24 24"
    >
      <path
        fill={color}
        d="M11 21H7v-2h4v2m4.5-2H17v2h-4v-2h.2l-1.4-6.1l-2.5.6c-.1.5-.3.9-.5 1.3c-.9 1.5-2.8 1.9-4.3 1c-1.5-.9-1.9-2.8-1-4.3c.9-1.5 2.8-1.9 4.3-1c.4.2.7.6.9.9l2.5-.6l-.6-2.5c-.4-.1-.8-.3-1.2-.5C8 6.9 7.5 5 8.4 3.5c.9-1.5 2.8-1.9 4.3-1c1.5.9 1.9 2.8 1 4.3c-.2.4-.6.7-.9.9L15.5 19M7 11.8c-.7-.5-1.7-.2-2.2.5c-.5.7-.2 1.7.5 2.1c.7.5 1.7.3 2.2-.5c.4-.7.2-1.7-.5-2.1M12.4 6c.5-.7.2-1.7-.5-2.2c-.7-.5-1.7-.2-2.2.5c-.4.7-.2 1.7.6 2.2c.7.4 1.7.2 2.1-.5m.4 5.3c-.2-.1-.4-.1-.5.1c-.1.2-.1.4.1.5c.2.1.4.1.5-.1c.2-.2.1-.4-.1-.5M21 8.5L14.5 10l.5 2.2l7.5-1.8l.5-.7l-2-1.2M23 19h-4v2h4v-2M5 19H1v2h4v-2Z"
      />
    </svg>
  )
}

export default IconScissors
