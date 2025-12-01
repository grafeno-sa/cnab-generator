function ValidationRules({ rules }) {
  return (
    <div className="row mt-3">
      <div className="col-12">
        <div className="validation-rules">
          <h4>Regras de Validação:</h4>
          <ul>
            {rules.map((rule, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: rule }}></li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ValidationRules;
