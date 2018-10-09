import React, { Component } from 'react'
import PropTypes from 'prop-types'

import withImage from './withImage'

/**
 * "Powered By Vtex" image's component, used in Footer
 *
 */
const FooterVtexLogo = ({ logoUrl, imageSrc }) => {
  if (!imageSrc) {
    return null
  }

  return (
    <div className="flex flex-row justify-center items-center ml-auto-m">
      <span className="pa1">
        <img className="vtex-footer__logo-image" src={logoUrl} />
      </span>
      <span className="pa1 nt7-ns">
        <img className="vtex-footer__vtexlogo-form-item" src={imageSrc} />
      </span>
    </div>
  )
}

FooterVtexLogo.displayName = 'FooterVtexLogo'

FooterVtexLogo.propTypes = {
  /** If true, the original logo (with color) is used. If not, the grayscale's one */
  showInColor: PropTypes.bool,
  /** The source for an external customizable logo to show above "Powered By Vtex" */
  logoUrl: PropTypes.string,
}

const getImagePathFromProps = ({ showInColor }) =>
  `VTEX${showInColor ? '' : '-BW'}.svg`

export default withImage(getImagePathFromProps)(FooterVtexLogo)
