export const throttle = (func: Function, time: number) => {
  let timer: number | null = null
  return function(this: any, ...args: any[]) {
    if(!timer){
      func.apply(this, args)
      timer = setTimeout(() => {
        timer = null
      },time)
    }
  }
}