export default [
  {
    path: '/tcp',
    name: 'TCP',
    component: () => import('../views/TCP/Index.vue'),
  },
  {
    path: '/mqtt',
    name: 'MQTT',
    component: () => import('../views/MQTT/Index.vue'),
  },
  {
    path: '/websocket',
    name: 'WebSocket',
    component: () => import('../views/WebSocket/Index.vue'),
  }
]