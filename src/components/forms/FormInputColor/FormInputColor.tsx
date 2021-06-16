import React, { InputHTMLAttributes, useState } from 'react'
import { FormBaseProps } from '../FormBaseProps'
import { FormLabel } from '../FormLabel'

export interface FormInputColorProps extends FormBaseProps {
  type?: InputHTMLAttributes<HTMLInputElement>['type']
}

export const FormInputColor: React.FC<FormInputColorProps> = ({
  label,
  labelDescription,
  type = 'color',
  name,
  register,
  defaultValue,
}) => {
  const [color, setColor] = useState(null)
  console.log('colorPicker', color)

  return (
    <div className='col-span-6 sm:col-span-4'>
      <div className='form-control'>
        <FormLabel name={name} label={label} labelDescription={labelDescription} />
        <div className='flex'>
          <input
            type={type}
            defaultValue={defaultValue}
            {...register(name)}
            onChange={(e) => setColor(e.target.value)}
            className='border-0 outline-none appearance-none h-30 w-30'
          />
          <span className='ml-5 text-sm font-bold'>{color}</span>
        </div>
      </div>
    </div>
  )
}