import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'

import { logo } from '@/config/logo'

export class Logo extends PureComponent {
  render() {
    const { collapsed } = this.props 
    const imgSrc = collapsed ? logo['small'] : logo['normal']
    
    return (
      <div className="logo">
        <Link to="/">
          <img src={imgSrc} alt={logo['title']} />
        </Link>
      </div>
    )
  }
}
