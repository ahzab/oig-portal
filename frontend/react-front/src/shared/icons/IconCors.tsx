interface Props {
  width?: string
  height?: string
  className?: string
  color?: string
}
const IconCors = ({
  width = '24',
  height = '24',
  className,
  color = 'currentColor',
}: Props) => {
  return (
    <svg
      className={className}
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8.779 10.949h-.4a.688.688 0 0 0-.123-.267.78.78 0 0 0-.212-.193.954.954 0 0 0-.275-.12c-.101-.026-.206-.04-.315-.04-.2 0-.38.045-.542.134a.973.973 0 0 0-.385.394 1.319 1.319 0 0 0-.141.637c0 .252.047.465.141.638a.974.974 0 0 0 .385.394c.162.089.342.133.542.133.109 0 .214-.013.315-.04a.977.977 0 0 0 .275-.118.8.8 0 0 0 .212-.194.7.7 0 0 0 .124-.267h.399a1.09 1.09 0 0 1-.46.699c-.118.081-.25.143-.398.186a1.661 1.661 0 0 1-.467.064c-.281 0-.531-.061-.75-.182a1.312 1.312 0 0 1-.516-.517A1.6 1.6 0 0 1 6 11.494a1.6 1.6 0 0 1 .188-.795c.126-.224.298-.396.516-.517a1.52 1.52 0 0 1 .75-.182c.166 0 .322.021.467.064.147.043.28.105.398.187s.216.181.295.299c.08.116.134.25.165.399zM12.201 11.494a1.6 1.6 0 0 1-.188.796 1.313 1.313 0 0 1-.516.517 1.52 1.52 0 0 1-.75.182c-.28 0-.53-.061-.748-.182a1.312 1.312 0 0 1-.517-.517 1.6 1.6 0 0 1-.188-.796 1.6 1.6 0 0 1 .188-.795c.126-.224.298-.396.517-.517a1.52 1.52 0 0 1 .749-.182c.28 0 .53.06.75.182.218.121.39.293.515.517a1.6 1.6 0 0 1 .188.795zm-.386 0c0-.252-.047-.464-.143-.637a.96.96 0 0 0-.384-.394 1.097 1.097 0 0 0-.54-.133c-.2 0-.38.044-.542.133a.974.974 0 0 0-.384.394 1.319 1.319 0 0 0-.142.637c0 .252.047.465.142.638a.974.974 0 0 0 .384.394c.162.089.342.133.542.133s.38-.044.54-.133a.96.96 0 0 0 .384-.394c.096-.173.143-.386.143-.638zM12.872 12.949v-2.91h1.113c.257 0 .468.04.633.117a.801.801 0 0 1 .367.317c.079.134.119.287.119.459 0 .171-.04.323-.12.456a.8.8 0 0 1-.364.312 1.521 1.521 0 0 1-.629.113h-.9v-.319h.887c.176 0 .318-.022.425-.068a.468.468 0 0 0 .234-.193.586.586 0 0 0 .074-.301.61.61 0 0 0-.074-.306.482.482 0 0 0-.236-.201 1.066 1.066 0 0 0-.43-.073h-.7v2.597h-.4zm1.55-1.307.81 1.307h-.463l-.797-1.307h.45zM17.57 10.767a.443.443 0 0 0-.236-.335.992.992 0 0 0-.505-.12c-.145 0-.273.021-.382.063a.608.608 0 0 0-.254.172.38.38 0 0 0-.09.248c0 .078.02.145.062.2.043.056.098.102.164.139.067.035.136.065.21.089.072.023.14.041.2.055l.335.08c.086.02.181.047.286.082.106.035.207.083.304.144.098.06.178.136.241.23a.603.603 0 0 1 .095.345c0 .157-.047.3-.14.426a.93.93 0 0 1-.405.303 1.654 1.654 0 0 1-.645.112c-.236 0-.44-.034-.612-.1a.966.966 0 0 1-.406-.282.745.745 0 0 1-.165-.42h.411c.011.11.053.202.126.274a.696.696 0 0 0 .28.159c.113.034.235.05.366.05.152 0 .289-.021.41-.064a.706.706 0 0 0 .288-.185.406.406 0 0 0 .106-.279.318.318 0 0 0-.092-.235.68.68 0 0 0-.24-.148 2.766 2.766 0 0 0-.324-.1l-.405-.102a1.586 1.586 0 0 1-.611-.28.583.583 0 0 1-.225-.476.65.65 0 0 1 .15-.426.98.98 0 0 1 .404-.284c.17-.068.361-.102.571-.102.213 0 .401.034.566.1a.968.968 0 0 1 .393.274.63.63 0 0 1 .154.393h-.386z"
        fill={color}
      />
      <rect
        x="4"
        y="4"
        width="16"
        height="16"
        rx="1"
        stroke={color}
        strokeWidth="2"
      />
    </svg>
  )
}

export default IconCors