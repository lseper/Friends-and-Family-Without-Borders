class QuestionnairesController < ApplicationController
  before_action :set_questionnaire, only: [:show, :update, :destroy]

  # GET users/id/questionnaires
  def index
    @questionnaires = Questionnaire.where(user_id: params[:user_id]).order(created_at: :desc)

    render json: @questionnaires
  end

  # GET /questionnaires/1
  def show
    @questionnaire = Questionnaire.where(id: params[:id])

    render json: @questionnaire
  end

  # POST /users/1/questionnaires
  def create
    puts params[:user_id]
    puts params
    puts questionnaire_params
    @questionnaire = Questionnaire.new(
      q1answer: questionnaire_params[:q1answer],
      q2answer: questionnaire_params[:q2answer],
      q3answer: questionnaire_params[:q3answer],
      q4answer: questionnaire_params[:q4answer],
      q5answer: questionnaire_params[:q5answer],
      q6answer: questionnaire_params[:q6answer],
      q7answer: questionnaire_params[:q7answer],
      q8answer: questionnaire_params[:q8answer],
      q9answer: questionnaire_params[:q9answer],
      q10answer: questionnaire_params[:q10answer],
      q11answer: questionnaire_params[:q11answer],
      q12answer: questionnaire_params[:q12answer],
      user_id: params[:user_id]
    )

    if @questionnaire.save
      render json: @questionnaire, status: :created, location: @questionnaire
    else
      render json: @questionnaire.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /questionnaires/1
  def update
    if @questionnaire.update(questionnaire_params)
      render json: @questionnaire
    else
      render json: @questionnaire.errors, status: :unprocessable_entity
    end
  end

  # DELETE /questionnaires/1
  def destroy
    @questionnaire.destroy
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_questionnaire
      @questionnaire = Questionnaire.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def questionnaire_params
      params.require(:questionnaire).permit(:q1answer, :q2answer, :q3answer, :q4answer, :q5answer, :q6answer, :q7answer, :q8answer, :q9answer, :q10answer, :q11answer, :q12answer, :user_id)
    end
end
