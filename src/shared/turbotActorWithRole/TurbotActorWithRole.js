import React from "react";
import TurbotAvatar from "../turbotAvatar/TurbotAvatar";
import { getTitle } from "../../utils/resources";

const TurbotActorWithRole = ({ actor }) => {
  const persona = actor.persona ? getTitle(actor.persona) : "";
  const altPersona = actor.alternatePersona || "";

  const toolTipText = (
    <table>
      <tbody>
        <tr>
          <td>Identity:</td>
          <td>{actor.identity ? getTitle(actor.identity) : "Unidentified"}</td>
        </tr>
        {persona.length > 0 && (
          <tr>
            <td>Persona:</td>
            <td>{persona}</td>
          </tr>
        )}
        {actor.role && (
          <tr>
            <td>Role:</td>
            <td>{getTitle(actor.role)}</td>
          </tr>
        )}
        {altPersona.length > 0 && altPersona !== persona && (
          <tr>
            <td>Persona:</td>
            <td>{altPersona}</td>
          </tr>
        )}
      </tbody>
    </table>
  );

  const badgeContent = (
    <TurbotAvatar
      imageSource={actor.persona ? actor.persona.picture : null}
      size="xs"
    />
  );

  return (
    <TurbotAvatar
      imageSource={
        actor.identity && actor.identity.picture
          ? actor.identity.picture
          : "https://www.gravatar.com/avatar/84cff85e29e900265d7d8792a59a045d?d=mp"
      }
      size="sm"
      isCentered={true}
      showTooltip={true}
      tooltipText={toolTipText}
      tooltipPlacement={"bottom"}
      enterDelay={500}
      showBadge={actor.persona && true}
      badgeContent={badgeContent}
      badgeSize="xs"
    />
  );
};

export default TurbotActorWithRole;
