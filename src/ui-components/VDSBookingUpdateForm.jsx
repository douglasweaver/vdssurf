/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Badge,
  Button,
  Divider,
  Flex,
  Grid,
  Icon,
  ScrollView,
  SelectField,
  Text,
  TextField,
  useTheme,
} from "@aws-amplify/ui-react";
import { fetchByPath, getOverrideProps, validateField } from "./utils";
import { generateClient } from "aws-amplify/api";
import { getVDSBooking } from "../graphql/queries";
import { updateVDSBooking } from "../graphql/mutations";
const client = generateClient();
function ArrayField({
  items = [],
  onChange,
  label,
  inputFieldRef,
  children,
  hasError,
  setFieldValue,
  currentFieldValue,
  defaultFieldValue,
  lengthLimit,
  getBadgeText,
  runValidationTasks,
  errorMessage,
}) {
  const labelElement = <Text>{label}</Text>;
  const {
    tokens: {
      components: {
        fieldmessages: { error: errorStyles },
      },
    },
  } = useTheme();
  const [selectedBadgeIndex, setSelectedBadgeIndex] = React.useState();
  const [isEditing, setIsEditing] = React.useState();
  React.useEffect(() => {
    if (isEditing) {
      inputFieldRef?.current?.focus();
    }
  }, [isEditing]);
  const removeItem = async (removeIndex) => {
    const newItems = items.filter((value, index) => index !== removeIndex);
    await onChange(newItems);
    setSelectedBadgeIndex(undefined);
  };
  const addItem = async () => {
    const { hasError } = runValidationTasks();
    if (
      currentFieldValue !== undefined &&
      currentFieldValue !== null &&
      currentFieldValue !== "" &&
      !hasError
    ) {
      const newItems = [...items];
      if (selectedBadgeIndex !== undefined) {
        newItems[selectedBadgeIndex] = currentFieldValue;
        setSelectedBadgeIndex(undefined);
      } else {
        newItems.push(currentFieldValue);
      }
      await onChange(newItems);
      setIsEditing(false);
    }
  };
  const arraySection = (
    <React.Fragment>
      {!!items?.length && (
        <ScrollView height="inherit" width="inherit" maxHeight={"7rem"}>
          {items.map((value, index) => {
            return (
              <Badge
                key={index}
                style={{
                  cursor: "pointer",
                  alignItems: "center",
                  marginRight: 3,
                  marginTop: 3,
                  backgroundColor:
                    index === selectedBadgeIndex ? "#B8CEF9" : "",
                }}
                onClick={() => {
                  setSelectedBadgeIndex(index);
                  setFieldValue(items[index]);
                  setIsEditing(true);
                }}
              >
                {getBadgeText ? getBadgeText(value) : value.toString()}
                <Icon
                  style={{
                    cursor: "pointer",
                    paddingLeft: 3,
                    width: 20,
                    height: 20,
                  }}
                  viewBox={{ width: 20, height: 20 }}
                  paths={[
                    {
                      d: "M10 10l5.09-5.09L10 10l5.09 5.09L10 10zm0 0L4.91 4.91 10 10l-5.09 5.09L10 10z",
                      stroke: "black",
                    },
                  ]}
                  ariaLabel="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    removeItem(index);
                  }}
                />
              </Badge>
            );
          })}
        </ScrollView>
      )}
      <Divider orientation="horizontal" marginTop={5} />
    </React.Fragment>
  );
  if (lengthLimit !== undefined && items.length >= lengthLimit && !isEditing) {
    return (
      <React.Fragment>
        {labelElement}
        {arraySection}
      </React.Fragment>
    );
  }
  return (
    <React.Fragment>
      {labelElement}
      {isEditing && children}
      {!isEditing ? (
        <>
          <Button
            onClick={() => {
              setIsEditing(true);
            }}
          >
            Add item
          </Button>
          {errorMessage && hasError && (
            <Text color={errorStyles.color} fontSize={errorStyles.fontSize}>
              {errorMessage}
            </Text>
          )}
        </>
      ) : (
        <Flex justifyContent="flex-end">
          {(currentFieldValue || isEditing) && (
            <Button
              children="Cancel"
              type="button"
              size="small"
              onClick={() => {
                setFieldValue(defaultFieldValue);
                setIsEditing(false);
                setSelectedBadgeIndex(undefined);
              }}
            ></Button>
          )}
          <Button size="small" variation="link" onClick={addItem}>
            {selectedBadgeIndex !== undefined ? "Save" : "Add"}
          </Button>
        </Flex>
      )}
      {arraySection}
    </React.Fragment>
  );
}
export default function VDSBookingUpdateForm(props) {
  const {
    id: idProp,
    vDSBooking: vDSBookingModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    guests: "",
    description: "",
    checkIn: "",
    checkOut: "",
    levels: [],
    autos: [],
    commitment: "",
    type: "",
    createdAt: "",
    updatedAt: "",
  };
  const [guests, setGuests] = React.useState(initialValues.guests);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [checkIn, setCheckIn] = React.useState(initialValues.checkIn);
  const [checkOut, setCheckOut] = React.useState(initialValues.checkOut);
  const [levels, setLevels] = React.useState(initialValues.levels);
  const [autos, setAutos] = React.useState(initialValues.autos);
  const [commitment, setCommitment] = React.useState(initialValues.commitment);
  const [type, setType] = React.useState(initialValues.type);
  const [createdAt, setCreatedAt] = React.useState(initialValues.createdAt);
  const [updatedAt, setUpdatedAt] = React.useState(initialValues.updatedAt);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = vDSBookingRecord
      ? { ...initialValues, ...vDSBookingRecord }
      : initialValues;
    setGuests(cleanValues.guests);
    setDescription(cleanValues.description);
    setCheckIn(cleanValues.checkIn);
    setCheckOut(cleanValues.checkOut);
    setLevels(cleanValues.levels ?? []);
    setCurrentLevelsValue("");
    setAutos(cleanValues.autos ?? []);
    setCurrentAutosValue("");
    setCommitment(cleanValues.commitment);
    setType(cleanValues.type);
    setCreatedAt(cleanValues.createdAt);
    setUpdatedAt(cleanValues.updatedAt);
    setErrors({});
  };
  const [vDSBookingRecord, setVDSBookingRecord] =
    React.useState(vDSBookingModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? (
            await client.graphql({
              query: getVDSBooking.replaceAll("__typename", ""),
              variables: { id: idProp },
            })
          )?.data?.getVDSBooking
        : vDSBookingModelProp;
      setVDSBookingRecord(record);
    };
    queryData();
  }, [idProp, vDSBookingModelProp]);
  React.useEffect(resetStateValues, [vDSBookingRecord]);
  const [currentLevelsValue, setCurrentLevelsValue] = React.useState("");
  const levelsRef = React.createRef();
  const [currentAutosValue, setCurrentAutosValue] = React.useState("");
  const autosRef = React.createRef();
  const getDisplayValue = {
    levels: (r) => {
      const enumDisplayValueMap = {
        TRESPALMAS: "Trespalmas",
        SANDY: "Sandy",
        STEPS: "Steps",
      };
      return enumDisplayValueMap[r];
    },
    autos: (r) => {
      const enumDisplayValueMap = {
        JEEP: "Jeep",
        FORD: "Ford",
        VOLVO: "Volvo",
      };
      return enumDisplayValueMap[r];
    },
  };
  const validations = {
    guests: [{ type: "Required" }],
    description: [],
    checkIn: [{ type: "Required" }],
    checkOut: [{ type: "Required" }],
    levels: [],
    autos: [],
    commitment: [{ type: "Required" }],
    type: [{ type: "Required" }],
    createdAt: [{ type: "Required" }],
    updatedAt: [{ type: "Required" }],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  const convertToLocal = (date) => {
    const df = new Intl.DateTimeFormat("default", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      calendar: "iso8601",
      numberingSystem: "latn",
      hourCycle: "h23",
    });
    const parts = df.formatToParts(date).reduce((acc, part) => {
      acc[part.type] = part.value;
      return acc;
    }, {});
    return `${parts.year}-${parts.month}-${parts.day}T${parts.hour}:${parts.minute}`;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          guests,
          description: description ?? null,
          checkIn,
          checkOut,
          levels: levels ?? null,
          autos: autos ?? null,
          commitment,
          type,
          createdAt,
          updatedAt,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await client.graphql({
            query: updateVDSBooking.replaceAll("__typename", ""),
            variables: {
              input: {
                id: vDSBookingRecord.id,
                ...modelFields,
              },
            },
          });
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            const messages = err.errors.map((e) => e.message).join("\n");
            onError(modelFields, messages);
          }
        }
      }}
      {...getOverrideProps(overrides, "VDSBookingUpdateForm")}
      {...rest}
    >
      <TextField
        label="Guests"
        isRequired={true}
        isReadOnly={false}
        value={guests}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              guests: value,
              description,
              checkIn,
              checkOut,
              levels,
              autos,
              commitment,
              type,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.guests ?? value;
          }
          if (errors.guests?.hasError) {
            runValidationTasks("guests", value);
          }
          setGuests(value);
        }}
        onBlur={() => runValidationTasks("guests", guests)}
        errorMessage={errors.guests?.errorMessage}
        hasError={errors.guests?.hasError}
        {...getOverrideProps(overrides, "guests")}
      ></TextField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              guests,
              description: value,
              checkIn,
              checkOut,
              levels,
              autos,
              commitment,
              type,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Check in"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={checkIn && convertToLocal(new Date(checkIn))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              guests,
              description,
              checkIn: value,
              checkOut,
              levels,
              autos,
              commitment,
              type,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.checkIn ?? value;
          }
          if (errors.checkIn?.hasError) {
            runValidationTasks("checkIn", value);
          }
          setCheckIn(value);
        }}
        onBlur={() => runValidationTasks("checkIn", checkIn)}
        errorMessage={errors.checkIn?.errorMessage}
        hasError={errors.checkIn?.hasError}
        {...getOverrideProps(overrides, "checkIn")}
      ></TextField>
      <TextField
        label="Check out"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={checkOut && convertToLocal(new Date(checkOut))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              guests,
              description,
              checkIn,
              checkOut: value,
              levels,
              autos,
              commitment,
              type,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.checkOut ?? value;
          }
          if (errors.checkOut?.hasError) {
            runValidationTasks("checkOut", value);
          }
          setCheckOut(value);
        }}
        onBlur={() => runValidationTasks("checkOut", checkOut)}
        errorMessage={errors.checkOut?.errorMessage}
        hasError={errors.checkOut?.hasError}
        {...getOverrideProps(overrides, "checkOut")}
      ></TextField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              guests,
              description,
              checkIn,
              checkOut,
              levels: values,
              autos,
              commitment,
              type,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            values = result?.levels ?? values;
          }
          setLevels(values);
          setCurrentLevelsValue("");
        }}
        currentFieldValue={currentLevelsValue}
        label={"Levels"}
        items={levels}
        hasError={errors?.levels?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("levels", currentLevelsValue)
        }
        errorMessage={errors?.levels?.errorMessage}
        getBadgeText={getDisplayValue.levels}
        setFieldValue={setCurrentLevelsValue}
        inputFieldRef={levelsRef}
        defaultFieldValue={""}
      >
        <SelectField
          label="Levels"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentLevelsValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.levels?.hasError) {
              runValidationTasks("levels", value);
            }
            setCurrentLevelsValue(value);
          }}
          onBlur={() => runValidationTasks("levels", currentLevelsValue)}
          errorMessage={errors.levels?.errorMessage}
          hasError={errors.levels?.hasError}
          ref={levelsRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "levels")}
        >
          <option
            children="Trespalmas"
            value="TRESPALMAS"
            {...getOverrideProps(overrides, "levelsoption0")}
          ></option>
          <option
            children="Sandy"
            value="SANDY"
            {...getOverrideProps(overrides, "levelsoption1")}
          ></option>
          <option
            children="Steps"
            value="STEPS"
            {...getOverrideProps(overrides, "levelsoption2")}
          ></option>
        </SelectField>
      </ArrayField>
      <ArrayField
        onChange={async (items) => {
          let values = items;
          if (onChange) {
            const modelFields = {
              guests,
              description,
              checkIn,
              checkOut,
              levels,
              autos: values,
              commitment,
              type,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            values = result?.autos ?? values;
          }
          setAutos(values);
          setCurrentAutosValue("");
        }}
        currentFieldValue={currentAutosValue}
        label={"Autos"}
        items={autos}
        hasError={errors?.autos?.hasError}
        runValidationTasks={async () =>
          await runValidationTasks("autos", currentAutosValue)
        }
        errorMessage={errors?.autos?.errorMessage}
        getBadgeText={getDisplayValue.autos}
        setFieldValue={setCurrentAutosValue}
        inputFieldRef={autosRef}
        defaultFieldValue={""}
      >
        <SelectField
          label="Autos"
          placeholder="Please select an option"
          isDisabled={false}
          value={currentAutosValue}
          onChange={(e) => {
            let { value } = e.target;
            if (errors.autos?.hasError) {
              runValidationTasks("autos", value);
            }
            setCurrentAutosValue(value);
          }}
          onBlur={() => runValidationTasks("autos", currentAutosValue)}
          errorMessage={errors.autos?.errorMessage}
          hasError={errors.autos?.hasError}
          ref={autosRef}
          labelHidden={true}
          {...getOverrideProps(overrides, "autos")}
        >
          <option
            children="Jeep"
            value="JEEP"
            {...getOverrideProps(overrides, "autosoption0")}
          ></option>
          <option
            children="Ford"
            value="FORD"
            {...getOverrideProps(overrides, "autosoption1")}
          ></option>
          <option
            children="Volvo"
            value="VOLVO"
            {...getOverrideProps(overrides, "autosoption2")}
          ></option>
        </SelectField>
      </ArrayField>
      <SelectField
        label="Commitment"
        placeholder="Please select an option"
        isDisabled={false}
        value={commitment}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              guests,
              description,
              checkIn,
              checkOut,
              levels,
              autos,
              commitment: value,
              type,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.commitment ?? value;
          }
          if (errors.commitment?.hasError) {
            runValidationTasks("commitment", value);
          }
          setCommitment(value);
        }}
        onBlur={() => runValidationTasks("commitment", commitment)}
        errorMessage={errors.commitment?.errorMessage}
        hasError={errors.commitment?.hasError}
        {...getOverrideProps(overrides, "commitment")}
      >
        <option
          children="Thinkingaboutit"
          value="THINKINGABOUTIT"
          {...getOverrideProps(overrides, "commitmentoption0")}
        ></option>
        <option
          children="Prettysure"
          value="PRETTYSURE"
          {...getOverrideProps(overrides, "commitmentoption1")}
        ></option>
        <option
          children="Confirmed"
          value="CONFIRMED"
          {...getOverrideProps(overrides, "commitmentoption2")}
        ></option>
      </SelectField>
      <TextField
        label="Type"
        isRequired={true}
        isReadOnly={false}
        value={type}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              guests,
              description,
              checkIn,
              checkOut,
              levels,
              autos,
              commitment,
              type: value,
              createdAt,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.type ?? value;
          }
          if (errors.type?.hasError) {
            runValidationTasks("type", value);
          }
          setType(value);
        }}
        onBlur={() => runValidationTasks("type", type)}
        errorMessage={errors.type?.errorMessage}
        hasError={errors.type?.hasError}
        {...getOverrideProps(overrides, "type")}
      ></TextField>
      <TextField
        label="Created at"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={createdAt && convertToLocal(new Date(createdAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              guests,
              description,
              checkIn,
              checkOut,
              levels,
              autos,
              commitment,
              type,
              createdAt: value,
              updatedAt,
            };
            const result = onChange(modelFields);
            value = result?.createdAt ?? value;
          }
          if (errors.createdAt?.hasError) {
            runValidationTasks("createdAt", value);
          }
          setCreatedAt(value);
        }}
        onBlur={() => runValidationTasks("createdAt", createdAt)}
        errorMessage={errors.createdAt?.errorMessage}
        hasError={errors.createdAt?.hasError}
        {...getOverrideProps(overrides, "createdAt")}
      ></TextField>
      <TextField
        label="Updated at"
        isRequired={true}
        isReadOnly={false}
        type="datetime-local"
        value={updatedAt && convertToLocal(new Date(updatedAt))}
        onChange={(e) => {
          let value =
            e.target.value === "" ? "" : new Date(e.target.value).toISOString();
          if (onChange) {
            const modelFields = {
              guests,
              description,
              checkIn,
              checkOut,
              levels,
              autos,
              commitment,
              type,
              createdAt,
              updatedAt: value,
            };
            const result = onChange(modelFields);
            value = result?.updatedAt ?? value;
          }
          if (errors.updatedAt?.hasError) {
            runValidationTasks("updatedAt", value);
          }
          setUpdatedAt(value);
        }}
        onBlur={() => runValidationTasks("updatedAt", updatedAt)}
        errorMessage={errors.updatedAt?.errorMessage}
        hasError={errors.updatedAt?.hasError}
        {...getOverrideProps(overrides, "updatedAt")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || vDSBookingModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || vDSBookingModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
