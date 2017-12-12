import { Component } from 'react'
import Exception from '@/components/exception'
/**
 * 403错误页面
 */
export class Page403 extends Component {
  render() {
    return (
      <div>
        <Exception type="403" style={{ minHeight: 500, height: '80%' }} />
      </div>
    )
  }
}