// 过渡动画的全程包括三种状态：稳定状态、进入状态和退出状态
import { animated, useTransition } from '@react-spring/web'
import { Outlet, useLocation } from 'react-router-dom'
export const WelcomeLayout: React.FC = () => {
  // 获取当前地址栏的信息
  const location = useLocation()
  const transitions = useTransition(location.pathname, {
    // 进入状态 (屏幕右边进入)
    from: { transform: 'translateX(100%)' },
    // 稳定状态
    enter: { transform: 'translateX(0%)' },
    // 退出状态（屏幕左边退出）
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 5000 },
  })
  // 会根据location自动返回对应的组件
  return transitions((style, pathname) => {
    return <animated.div key={pathname} style={style}>
      <div style={{ textAlign: 'center' }}>
        <Outlet />
      </div>
    </animated.div>
  })
}
