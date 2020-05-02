import React from "react"
import { useFormContext } from "react-hook-form"

const AddressFields = ({ type }) => {
  const { errors, register } = useFormContext()

  const isShipping = type === "shipping"

  return (
    <fieldset>
      <legend>{type}</legend>

      <div>
        <input
          name={`${type}.name`}
          ref={register({ required: true })}
          placeholder="Name"
        />
        {errors[type] && errors[type].name && "Name is required."}
      </div>

      {isShipping && (
        <div>
          <input
            type="email"
            name="email"
            ref={register({ required: true })}
            placeholder="Email"
          />
          {errors[type] && errors[type].email && "Email is required."}
        </div>
      )}

      <div>
        <input
          name={`${type}.line1`}
          ref={register({ required: true })}
          placeholder="Line 1"
        />
        {errors[type] && errors[type].line1 && "Line 1 is required."}
      </div>
      <div>
        <input name={`${type}.line2`} ref={register} placeholder="Line 2" />
      </div>
      <div>
        <input
          name={`${type}.city`}
          ref={register({ required: true })}
          placeholder="City"
        />
        {errors[type] && errors[type].city && "City is required."}
      </div>
      <div>
        <input
          name={`${type}.state`}
          ref={register({ required: true })}
          placeholder="State"
        />
        {errors[type] && errors[type].state && "State is required."}
      </div>
      <div>
        <input
          name={`${type}.postalCode`}
          ref={register({ required: true })}
          placeholder="Zip/Post code"
        />
        {errors[type] && errors[type].postalCode && "Post code is required."}
      </div>
      <div>
        <input
          name={`${type}.country`}
          ref={register({ required: true })}
          placeholder="Country"
        />
        {errors[type] && errors[type].country && "Country is required."}
      </div>

      {isShipping && (
        <React.Fragment>
          <div>
            <textarea name="notes" ref={register} placeholder="Notes" />
          </div>
          <div>
            <label htmlFor="useSeparateBilling">
              <input
                type="checkbox"
                id="useSeparateBilling"
                name="useSeparateBilling"
                ref={register}
              />{" "}
              Use different billing address
            </label>
          </div>
        </React.Fragment>
      )}
    </fieldset>
  )
}

export default AddressFields
