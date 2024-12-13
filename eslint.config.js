import antfu from '@antfu/eslint-config'

export default await antfu({
  vue: true,
  rules: {
    'no-undef': 'off',
    "vue/custom-event-name-casing": false
  },
})
