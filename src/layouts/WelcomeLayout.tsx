// 过渡动画的全程包括三种状态：稳定状态、进入状态和退出状态
import { animated, useTransition } from '@react-spring/web'
import type { ReactNode } from 'react'
import { useRef } from 'react'
import { useLocation, useOutlet } from 'react-router-dom'

export const WelcomeLayout: React.FC = () => {
  const renderCache = useRef<Record<string, ReactNode>>({})
  // 获取当前地址栏的信息
  const location = useLocation()
  // 获取当前路由渲染出口
  const outlet = useOutlet()
  // 缓存当前路由与 Outlet 组件
  renderCache.current[location.pathname] = outlet
  const transitions = useTransition(location.pathname, {
    // 进入状态 (屏幕右边进入)
    from: { transform: location.pathname === '/welcome/1' ? 'translateX(0%)' : 'translateX(100%)' },
    // 稳定状态
    enter: { transform: 'translateX(0%)' },
    // 退出状态（屏幕左边退出）
    leave: { transform: 'translateX(-100%)' },
    config: { duration: 500 },
  })
  // 会根据location自动返回对应的组件
  return transitions((style, pathname) =>
     <animated.div key={pathname} style={style}>
      <div style={{ textAlign: 'center' }}>
        {/* 渲染缓存中的 outlet，而不是最新的 <Outlet /> */}
        {renderCache.current[pathname]}
      </div>
    </animated.div>,
  )
}
