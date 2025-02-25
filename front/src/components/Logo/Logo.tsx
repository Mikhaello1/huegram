import { FC } from "react"

interface LogoProps{
  styles: string;
}


export const Logo: FC<LogoProps> = ({styles}) => {
  return (
    <div className={styles}>
        <img src="/logo.png" alt="" className=""/>
    </div>
  )
}
