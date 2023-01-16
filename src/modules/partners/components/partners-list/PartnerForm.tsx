import { FC } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { Controller, useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import Checkbox from "@mui/material/Checkbox";
import { useSnackbar } from "notistack";
import { useQueryClient } from "@tanstack/react-query";

import { partnersFormValidation } from "./partnersFormValidation";
import { PartnerModel } from "modules/partners/models/partner-models";
import { Modal } from "modules/common/components/Modal/Modal";
import { useCreate } from "modules/partners/api/hooks/useCreate";
import { useUpdate } from "modules/partners/api/hooks/useUpdate";
import { partnerList } from "modules/partners/api/constant";

interface ModalFooterProps {
  onCancel: () => void;
  onSubmit: () => void;
}

const ModalFooter: FC<ModalFooterProps> = ({ onCancel, onSubmit }) => {
  return (
    <Box
      sx={{
        height: "58px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        borderTop: "1px solid rgba(0, 0, 0, 0.12)",
      }}
    >
      <Button sx={{ marginRight: "10px" }} variant="text" onClick={onCancel}>
        Cancel
      </Button>
      <Button onClick={onSubmit} variant="contained">
        Save
      </Button>
    </Box>
  );
};

interface PartnersFormProps {
  onClose: () => void;
  partner?: PartnerModel;
}
const PartnerForm: FC<PartnersFormProps> = ({ onClose, partner }) => {
  const { mutate: createPartner } = useCreate();
  const { mutate: updatePartner } = useUpdate();
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PartnerModel>({
    resolver: yupResolver(partnersFormValidation),
  });

  const onSubmit: SubmitHandler<PartnerModel> = (data: any) => {
    if (partner) {
      updatePartner(
        { id: partner.id, partner: data },
        {
          onSuccess: () => {
            onClose();
            enqueueSnackbar("the partner update successfully", {
              variant: "success",
            });
            queryClient.invalidateQueries({ queryKey: [partnerList] });
          },
          onError: () => {
            enqueueSnackbar("something get wrong", {
              variant: "error",
            });
          },
        }
      );
    } else {
      createPartner(data, {
        onSuccess: () => {
          onClose();
          enqueueSnackbar("the partner create successfully", {
            variant: "success",
          });
          queryClient.invalidateQueries({ queryKey: [partnerList] });
        },
        onError: () => {
          enqueueSnackbar("something get wrong", {
            variant: "error",
          });
        },
      });
    }
    console.log(data);
  };

  return (
    <Modal
      title={partner ? "Edit Partner" : "Create Partner"}
      onClose={onClose}
      footer={
        <ModalFooter onCancel={onClose} onSubmit={handleSubmit(onSubmit)} />
      }
    >
      <form>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            height: "240px",
            justifyContent: "space-around",
            padding: "8px 24px",
          }}
        >
          <TextField
            size="small"
            id="outlined-basic"
            label="Company Name"
            variant="outlined"
            {...register("name")}
            defaultValue={partner?.name}
            error={Boolean(errors.name)}
          />
          <Controller
            render={({ field: { onChange } }) => (
              <Autocomplete
                multiple
                limitTags={5}
                size="small"
                id="checkboxes-tags-demo"
                disableCloseOnSelect
                defaultValue={partner?.targetRegions}
                onChange={(e, value) => onChange([...value])}
                options={[
                  "Armenia",
                  "USA",
                  "UK",
                  "Georgia",
                  "Iran",
                  "Wales",
                  "France",
                  "Spain",
                  "Canada",
                  "China",
                  "Japan",
                ]}
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox
                      icon={icon}
                      checkedIcon={checkedIcon}
                      style={{ marginRight: 8 }}
                      checked={selected}
                    />
                    {option}
                  </li>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label={
                      params.inputProps["aria-expanded"]
                        ? "Target Regions"
                        : null
                    }
                    placeholder="Target Regions"
                    size="small"
                    error={Boolean(errors.targetRegions)}
                  />
                )}
              />
            )}
            defaultValue={partner?.targetRegions}
            name="targetRegions"
            control={control}
          />
          <TextField
            size="small"
            id="outlined-basic"
            label="Person Name"
            variant="outlined"
            {...register("contactPersonName")}
            defaultValue={partner?.contactPersonName}
            error={Boolean(errors.contactPersonName)}
          />
          <TextField
            size="small"
            id="outlined-basic"
            label="Person Email"
            variant="outlined"
            {...register("contactEmail")}
            defaultValue={partner?.contactEmail}
            error={Boolean(errors.contactEmail)}
          />
        </Box>
      </form>
    </Modal>
  );
};

export default PartnerForm;
