import { defineConfig, presetAttributify, presetIcons, presetTypography, presetUno, transformerAttributifyJsx } from 'unocss'
export default defineConfig({
  theme: {},
  shortcuts: {},
  safelist: [],
  presets: [
    // 必须引用的
    presetUno(),
    // 支持属性化
    presetAttributify(),
    // 预设图标类样式
    presetIcons({
      extraProperties: { 'display': 'inline-block', 'vertical-align': 'center' },
    }),
    // 预设板式
    presetTypography(),
  ],
  transformers: [
    // jsx支持属性化
    transformerAttributifyJsx(),
  ],
})
