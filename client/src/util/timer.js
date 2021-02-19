const manage = ref => (
  [
    id => ref.current.push(id),
    id => ref.current = ref.current.filter(i => i !== id),
    () => () => ref.current.forEach(clearInterval)
  ]
)

export default manage