import classnames from 'classnames'
import style from './Welcome1.module.scss'
export const Welcome1 = () => {
  return (
    <>
      <div className={classnames(style.redBd, style.blueBg)}>
        多个类名
      </div>
      <div className={style.container}>
        伪类选择器
      </div>
      <div className={style.father}>
        <div className={style.child}>子类red</div>
        <div>子类</div>
      </div>
      <div className={classnames(style.random, 'gsq')}>固定类名</div>
      <div className={classnames(style.random2, 'gsq2')}>固定类名添加样式</div>
    </>
  )
}
