import {
  CrudButtonHoverStates,
  CrudButtonSize,
  CrudButtonVariants
} from "./TurbotCrudButton";

const TurbotCrudButtonStyles = theme => ({
  button: {
    whiteSpace: "nowrap",
    lineHeight: "1",
    [`&--${CrudButtonHoverStates.CREATE}`]: {
      "&:hover": {
        backgroundColor: theme.palette.primary.main
      }
    },
    [`&--${CrudButtonHoverStates.UPDATE}`]: {
      "&:hover": {
        backgroundColor: theme.palette.turbot.dark
      }
    },
    [`&--${CrudButtonHoverStates.DELETE}`]: {
      "&:hover": {
        backgroundColor: theme.palette.error.main
      }
    },
    [`&--${CrudButtonVariants.DEFAULT}`]: {
      // color: theme.palette.grey["800"],
      borderColor: theme.palette.grey["400"]
    },
    [`&--${CrudButtonSize.SMALL}`]: {
      padding: "0.15rem 0.3rem"
    },
    [`&--${CrudButtonSize.LARGE}`]: {},
    [`&--Disabled`]: {
      cursor: "no-drop !important"
    }
  }
});

export default TurbotCrudButtonStyles;
