/**
 * 用于配置后端数据的常量
 * 变量名统一格式 XXX_XXX_XXX
 */

// 需求单状态
export const REQ_STATUS_SCRATCH = 1001 // 草稿
export const REQ_STATUS_PROCESSED = 115002 // 审批中
export const REQ_STATUS_RETURNED = 115003 // 审批退回
export const REQ_STATUS_EXPANDED = 115004  // 扩容中
export const REQ_STATUS_COMPLETED = 115005 // 已完成
export const REQ_STATUS_ABORTED = 115006 // 已终止