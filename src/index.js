class DeepCloner {
    constructor() {
        this.cache = []
    }
    clone(source) {
        if (source instanceof Object) {
            const cacheDist = this.findCache(source)
            if (cacheDist) return cacheDist
            else {
                let target
                if (source instanceof Array) {
                    target = new Array()
                } else if (source instanceof Function) {
                    target = function () {
                        return source.apply(this, arguments)
                    }
                } else if (source instanceof Date) {
                    target = new Date(source)
                } else if (source instanceof RegExp) {
                    target = new RegExp(source.source, source.flags)
                } else {
                    target = new Object()
                }
                this.cache.push([source, target])
                for (let key in source) {
                    if (source.hasOwnProperty(key)) {
                        target[key] = this.clone(source[key])
                    }
                }
                return target
            }
        }
        return source
    }
    findCache(source) {
        for (let i = 0; i < this.cache.length; ++i) {
            if (this.cache[i][0] === source) {
                return this.cache[i][1]
            }
        }
        return undefined
    }
}

module.exports = DeepCloner