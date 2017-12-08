import './index.less'

export const Field = ({ label, value, ...rest }) => (
  <div className="field" {...rest}>
    <span>{label}</span>
    <span>{value}</span>
  </div>
)
