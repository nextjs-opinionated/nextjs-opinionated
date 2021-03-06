import React, { ReactNode, useEffect, useState } from 'react'
import { Transition, Menu } from '@headlessui/react'
import classnames from 'classnames'
import { FaCaretDown } from 'react-icons/fa'

export interface DropDownProps {
  label: ReactNode
  items: { id: string; value: ReactNode }[]
  onSelect: (string) => void
  selectedId: string | null
  className?: string
  classNameButton?: string
  width?: number
}

export const DropDown: React.FC<DropDownProps> = ({
  label,
  items,
  onSelect,
  selectedId,
  className,
  classNameButton,
  width = 176,
}) => {
  const [currentValue, currentValueSet] = useState<string | null>(null)
  useEffect(() => {
    const localValue = items.find((i) => i.id === selectedId)
    if (localValue) {
      currentValueSet(String(localValue.value))
    } else {
      currentValueSet('')
    }
  }, [items, selectedId])

  if (currentValue === null) {
    return null
  }

  return (
    <Menu as='div' className={`dropdown dropdown-end ${className}`}>
      {({ open }) => (
        <div>
          <Menu.Button className={`btn ${classNameButton}`}>
            {currentValue === '' ? (
              <div className='flex items-center justify-between' style={{ width }}>
                <div className='mr-2'>{label}</div>
                <FaCaretDown />{' '}
              </div>
            ) : (
              <div style={{ width }}>{currentValue}</div>
            )}
          </Menu.Button>
          <Transition
            show={open}
            enter='transition ease-out duration-100'
            enterFrom='transform opacity-0 scale-95'
            enterTo='transform opacity-100 scale-100'
            leave='transition ease-in duration-75'
            leaveFrom='transform opacity-100 scale-100'
            leaveTo='transform opacity-0 scale-95'
          >
            <Menu.Items
              static
              className='shadow menu dropdown-content'
              style={{ width: width + 34 }}
            >
              {Object.values(items).map((t) => (
                <Menu.Item key={t.id}>
                  <li>
                    <button
                      type='button'
                      className={classnames({
                        'font-bold': selectedId === t.id,
                      })}
                      onClick={() => {
                        onSelect(t.id)
                      }}
                    >
                      {t.value}
                    </button>
                  </li>
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </div>
      )}
    </Menu>
  )
}
