import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'


// Custom APIs for renderer
export const api = {
  getUser: (id) => ipcRenderer.invoke('get-users', id),
  getAllUsers: () => ipcRenderer.invoke('get-all-users'),
  findUsers: (query) => ipcRenderer.invoke('find-users', query),
  addUser: (item) => ipcRenderer.invoke('add-users', item),
  updateUser: (id, item) => ipcRenderer.invoke('update-user', id, item),
  removeUser: (id) => ipcRenderer.invoke('remove-users', id),

  getMenuItem: (id) => ipcRenderer.invoke('get-menu', id),
  getAllMenuItems: () => ipcRenderer.invoke('get-all-menu'),
  findMenuItems: (query) => ipcRenderer.invoke('find-menu', query),
  addMenuItem: (item) => ipcRenderer.invoke('add-menu', item),
  updateMenuItem: (id, item) => ipcRenderer.invoke('update-menu', id, item),
  removeMenuItem: (id) => ipcRenderer.invoke('remove-menu', id),

  getOrder: (id) => ipcRenderer.invoke('get-orders', id),
  getAllOrders: () => ipcRenderer.invoke('get-all-orders'),
  findOrders: (query) => ipcRenderer.invoke('find-orders', query),
  addOrder: (item) => ipcRenderer.invoke('add-orders', item),
  removeOrder: (id) => ipcRenderer.invoke('remove-orders', id),

  getOrderItem: (id) => ipcRenderer.invoke('get-orderItems', id),
  getAllOrderItems: () => ipcRenderer.invoke('get-all-orderItems'),
  findOrderItems: (query) => ipcRenderer.invoke('find-orderItems', query),
  addOrderItem: (item) => ipcRenderer.invoke('add-orderItems', item),
  removeOrderItem: (id) => ipcRenderer.invoke('remove-orderItems', id),

  getProduct: (id) => ipcRenderer.invoke('get-products', id),
  getAllProducts: () => ipcRenderer.invoke('get-all-products'),
  findProducts: (query) => ipcRenderer.invoke('find-products', query),
  addProduct: (item) => ipcRenderer.invoke('add-products', item),
  removeProduct: (id) => ipcRenderer.invoke('remove-products', id)
}

console.log(typeof api);


// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
  } catch (error) {
    console.error(error)
  }
} else {
  // @ts-ignore (define in dts)
  window.electron = electronAPI
  // @ts-ignore (define in dts)
  window.api = api
}
