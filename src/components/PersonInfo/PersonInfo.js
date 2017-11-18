import React from 'react';

const PersonInfo = ({ personData }) => {
  if (!personData) {
    return 'Loading...';
  }

  return (
    <div>
      <h1>{personData.name}</h1>
      <table>
        <tbody>
          <tr>
            <td>Height</td>
            <td>{personData.height}</td>
          </tr>
          <tr>
            <td>Mass</td>
            <td>{personData.mass}</td>
          </tr>
          <tr>
            <td>Hair color</td>
            <td>{personData.hair_color}</td>
          </tr>
          <tr>
            <td>Skin color</td>
            <td>{personData.skin_color}</td>
          </tr>
          <tr>
            <td>Eye color</td>
            <td>{personData.eye_color}</td>
          </tr>
          <tr>
            <td>Birth year</td>
            <td>{personData.birth_year}</td>
          </tr>
          <tr>
            <td>Gender</td>
            <td>{personData.gender}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PersonInfo;