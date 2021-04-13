import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import { ToastSeverity } from '../lib/slices/toast'
import snippets from '../styles/snippets'
import { zIndex } from '../styles/zIndex'

const bgColors = {
  [ToastSeverity.success]: '#388e3c',
  [ToastSeverity.error]: '#d32f2f',
}

const Wrapper = styled.div<{
  transitionDuration: number
  severity?: ToastSeverity
}>`
  ${snippets.fontFamily.sans};
  ${snippets.fontSize.base};
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: ${zIndex.toast};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px;
  color: #ffffff;
  background-color: ${(props) =>
    bgColors[props.severity ?? ToastSeverity.success]};
  opacity: 0;
  transform: translateY(120%);
  transition-property: opacity, transform;
  transition-duration: ${(props) => `${props.transitionDuration}ms`};

  &.show {
    opacity: 1;
    transform: translateY(0);
  }

  > .icon {
    margin-right: 10px;
  }
`

const transitionDuration = 300
const autoHideDuration = 3000

export interface ToastProps {
  isShow: boolean
  icon?: IconProp
  message?: ReactNode
  severity?: ToastSeverity
  /**
   * A function that runs when the toast should hide.
   * This function suppose to change state `isShow` back to false
   */
  onHide: () => void
  /**
   * Runs when the toast is about to be destroyed
   */
  onDestroy?: () => void
}

export default function Toast({
  isShow,
  severity,
  onHide,
  onDestroy,
  icon,
  message,
}: ToastProps) {
  const [mountDOM, setMountDOM] = useState(false)
  const [animating, setAnimating] = useState(false)

  useEffect(() => {
    let autoHideTimeoutId: NodeJS.Timeout
    let animationTimeoutId: NodeJS.Timeout

    // If `show` is requested but DOM is not mounted,
    // mount DOM and animate in
    if (isShow && !mountDOM) {
      setMountDOM(true)
      setAnimating(true)

      // Start countdown for auto close
      autoHideTimeoutId = setTimeout(onHide, autoHideDuration)
    } else if (!isShow && mountDOM) {
      // If `hide` is requested but the DOM is still present,
      // animate out
      setAnimating(false)

      // When animation is done, unmount the DOM
      animationTimeoutId = setTimeout(() => {
        setMountDOM(false)
        onDestroy?.()
        // add 150ms just to make sure that the animation is done
      }, transitionDuration + 150)
    }

    return () => {
      // Clear unused timeout
      if (!isShow) {
        clearTimeout(autoHideTimeoutId)
        clearTimeout(animationTimeoutId)
      }
    }
  }, [isShow, onHide, mountDOM, onDestroy])

  if (!isShow && !mountDOM) {
    return null
  }

  return (
    <Wrapper
      severity={severity}
      className={animating ? 'show' : undefined}
      transitionDuration={transitionDuration}
    >
      {!!icon && <FontAwesomeIcon className="icon" icon={icon} />}
      {message}
    </Wrapper>
  )
}
