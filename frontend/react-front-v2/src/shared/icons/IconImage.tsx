interface Props {
  width?: string
  height?: string
  className?: string
  color?: string
}
const IconImage = ({
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
      viewBox="0 96 960 960"
    >
      <path d="M200 976q-50 0-85-35t-35-85V296q0-50 35-85t85-35h560q50 0 85 35t35 85v560q0 50-35 85t-85 35H200Zm0-60h560q25.5 0 42.75-17.25T820 856V296q0-25.5-17.25-42.75T760 236H200q-25.5 0-42.75 17.25T140 296v560q0 25.5 17.25 42.75T200 916Zm64-110 136-136 73 72 87-110 139 174H264Zm55.911-320Q291 486 270.5 465.411q-20.5-20.588-20.5-49.5Q250 387 270.589 366.5q20.588-20.5 49.5-20.5Q349 346 369.5 366.589q20.5 20.588 20.5 49.5Q390 445 369.411 465.5q-20.588 20.5-49.5 20.5Z" />
    </svg>
  )
}

export default IconImage
