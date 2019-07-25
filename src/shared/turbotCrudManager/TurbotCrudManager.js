import withStyles from "@material-ui/core/styles/withStyles";
import React from "react";
import ContentSection from "../../layout/dialog/dialogContent/contentSection/ContentSection";
import TurbotButton from "../turbotButton/TurbotButton";
import TurbotCrudManagerStyles from "./TurbotCrudManager.styles";

const TurbotCrudManager = ({
  canCreate,
  canEdit,
  canDelete,
  onNewClick,
  onEditClick,
  onDeleteClick,
  classes
}) => {
  const canManage = canCreate || canEdit || canDelete;
  if (canManage) {
    return (
      <ContentSection gridSize={{ md: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: canCreate ? "space-between" : "flex-end"
          }}
        >
          {canCreate && (
            <TurbotButton
              classes={{ outlined: classes.create, root: classes.createRoot }}
              variant="outlined"
              onClick={onNewClick}
              size="small"
            >
              New
            </TurbotButton>
          )}
          <div>
            {canEdit && (
              <TurbotButton
                classes={{ outlined: classes.edit, root: classes.editRoot }}
                variant="outlined"
                onClick={onEditClick}
                size="small"
              >
                Edit
              </TurbotButton>
            )}
            {canDelete && (
              <TurbotButton
                classes={{
                  outlined: classes.delete,
                  root: classes.deleteRoot
                }}
                variant="outlined"
                onClick={onDeleteClick}
                size="small"
              >
                Delete
              </TurbotButton>
            )}
          </div>
        </div>
      </ContentSection>
    );
  } else return null;
};

export default withStyles(TurbotCrudManagerStyles)(TurbotCrudManager);
