

export const Avatar: React.FC<{url: string, size: number}> = ({url, size}) => {
  return (
    <div className="relative inline-block rounded-full overflow-hidden" style={{ width: `${size}px`, height: `${size}px` }}>
        <img src={url} alt="" className="absolute w-full h-full object-cover"/>
    </div>
  )
}
