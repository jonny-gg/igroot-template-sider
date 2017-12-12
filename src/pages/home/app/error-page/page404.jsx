import { Component } from 'react'
import Exception from '@/components/exception'
/**
 * 404错误页面
 */
export class Page404 extends Component {
  render() {
    return (
      <div>
        <Exception type="404" style={{ minHeight: 500, height: '80%' }} />
      </div>
    )
  }
}