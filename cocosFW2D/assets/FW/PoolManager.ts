import { Node, NodePool } from "cc"

export default class PoolManager {
    private static poolDic = new Object() as { string: NodePool }
    /**
     * 初始化对象池
     * @param pool_name 对象池名字
     * @param component 对象池组件
     */
    public static InitPool(pool_name: string, component: any): void {
        if (PoolManager.poolDic[pool_name] == null) {
            let pool = new NodePool(component)
            PoolManager.poolDic[pool_name] = pool
        }
    }
    /**
     * 获取对象池内对象，空则返回空
     * @param pool_name 对象池名字
     */
    public static GetObj(pool_name: string): Node | null {
        if (PoolManager.poolDic[pool_name] == null) {
            console.error('pool is empty')
            return null
        }
        return (PoolManager.poolDic[pool_name] as NodePool).get()
    }
    /**
     * 回收对象
     * @param pool_name 对象池名字
     */
    public static PutObj(pool_name: string, obj: Node, ObjInit: Function): void {
        if (PoolManager.poolDic[pool_name] == null) {
            console.error('pool is empty')
            return
        }
        if (ObjInit != null)
            ObjInit();
        (PoolManager.poolDic[pool_name] as NodePool).put(obj)
    }
    /**
     * 获取对象池中保存的对象
     * @param pool_name 对象池名字
     * @returns 
     */
    public static GetPoolCount(pool_name: string): number | null {
        if (PoolManager.poolDic[pool_name] == null) {
            console.error('pool is empty')
            return null
        }
        return PoolManager.poolDic[pool_name].count
    }
    /**
     * 销毁对象池中所有对象
     * @param pool_name 对象池名字
     * @returns 
     */
    public static ClearPool(pool_name: string) {
        const pool: NodePool = PoolManager.poolDic[pool_name]
        if (pool == null) return
        pool.clear()
    }
}

